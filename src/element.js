/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) Anders Evenrud <andersevenrud@gmail.com>
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
import {filteredProps} from './utils';
import {Element} from './components/Element';

/**
 * Creates a new field Element wrapper
 * @param {String} name Field name
 * @param {Object} props Field props
 * @param {Function} cb Callback to create inner element => (props)
 * @param {Function} cb Callback to get value => (event)
 */
export const createField = (name, props, defaultProps, cb, cbInput) => {
  const oninput = props.oninput || function() {};
  const onchange = props.onchange || function() {};
  const onkeydown = props.onkeydown || function() {};

  const getValue = cbInput || (ev => [ev.target.value]);
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

  return h(Element, Object.assign({}, props.box || {}, {
    class: 'osjs-gui-field osjs-gui-' + name
  }), cb(fieldProps));
};
