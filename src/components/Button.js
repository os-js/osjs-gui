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
import {className, icon} from '../utils';

const createProps = (props, defaults = {}, ignore = []) => Object.keys(props)
  .filter(k => ['class', 'style', 'label', 'inputStyle', ...ignore].indexOf(k) === -1)
  .reduce((o, k) => Object.assign(o, {[k]: props[k]}), defaults);

const createInner = props => {
  const children = [];
  if (props.icon) {
    children.push(icon(props.icon));
  }
  if (typeof props.label === 'string') {
    children.push(h('span', [], props.label));
  }

  return children;
};

/**
 * A button
 * @param {Object} props Properties
 * @param {String} [props.class] Append this className
 * @param {Object} [props.style] CSS Style object
 * @param {Boolean} [props.disabled] Disabled attribute
 * @param {Object} [props.inputStyle] CSS Style object for input
 * @param {Function} [props.onclick] Click event
 */
const Button = props => h('div', createProps(props, {
  class: className('osjs-gui-button', props),
  style: props.style
}, ['onclick']), [
  h('button', createProps(props, {
    style: props.inputStyle
  }), createInner(props))
]);

export default Button;
