/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

import {h} from 'hyperapp';

const className = (name, props, ...args) => [
  'osjs-gui',
  props.class || props.className,
  name,
  ...args
].filter(s => !!s).join(' ').trim();

const flexes = {
  vertical: 'row',
  horizontal: 'column'
};

const boxStyles = (props, orientation = null) => Object.assign({}, {
  flexDirection: flexes[orientation],
  flexGrow: props.grow,
  flexShrink: props.shrink,
  flexBasis: typeof props.basis === 'number' ? String(props.basis) + 'px' : props.basis,
  alignItems: props.align,
  justifyContent: props.justify,
  margin: typeof props.padding === 'undefined' || props.padding === true ? undefined : '0'
}, props.style || {});

const boxProps = (name, props, defaultOrientation = 'horizontal') => {
  let orientation = props.orientation || defaultOrientation;
  if (defaultOrientation !== null) {
    if (orientation !== defaultOrientation) {
      orientation = defaultOrientation === 'horizontal' ? 'vertical' : 'horizontal';
    }
  }

  return {
    class: className(name, props, 'osjs-gui-' + orientation),
    style: boxStyles(props, orientation)
  };
};

const icon = (props) => h('i', {
  'data-icon': typeof props === 'object' ? props.name : undefined,
  class: 'osjs-icon',
  style: {
    backgroundImage: typeof props === 'string' ? `url(${props})` : undefined
  }
});

const filteredProps = (props, filterKeys) => {
  const keys = Object.keys(props);
  const filter = k => filterKeys.indexOf(k) === -1;

  return keys
    .filter(filter)
    .reduce((result, k) => Object.assign({
      [k]: props[k]
    }, result), {});
};

const fieldWrapper = (name, props, defaultProps, cb, cbInput) => {
  const oninput = props.oninput || function() {};
  const onchange = props.onchange || function() {};
  const onkeydown = props.onkeydown || function() {};

  const getValue = cbInput || (ev => [ev.target.value]);
  const wrapperProps = boxProps('osjs-gui-field', props.box || {}, null);
  const fieldProps = Object.assign(
    {
      oninput: ev => oninput(ev, ...getValue(ev)),
      onchange: ev => onchange(ev, ...getValue(ev)),
      onkeydown: ev => {
        if (ev.keyCode === 13 && props.onenter) {
          props.onenter(ev, ...getValue(ev));
        }
        onkeydown(ev);
      }
    },
    defaultProps,
    filteredProps(props, ['choices', 'label', 'box', 'oninput', 'onchange'])
  );

  wrapperProps.class += ' osjs-gui-' + name;

  return h('div', wrapperProps, cb(fieldProps));
};

export {className, boxProps, boxStyles, filteredProps, fieldWrapper, icon};
