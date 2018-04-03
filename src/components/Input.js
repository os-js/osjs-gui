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
import {className} from '../utils';

const noop = function() {};

const createProps = (defaults, props, except = []) => {
  const ignore = [
    'key',
    'class',
    'style',
    'inputStyle',
    'multiple',
    'oncreate',
    'oninput',
    'onchange',
    ...except];

  const assignProps = Object.keys(props)
    .filter(k => ignore.indexOf(k) === -1)
    .reduce((o, k) => Object.assign(o, {[k]: props[k]}), {});

  return Object.assign({}, defaults, {
    oninput: (ev) => (props.oninput || noop)(ev.target.value, ev),
    onchange: (ev) => (props.onchange || noop)(ev.target.value, ev),
    onkeydown: (ev) => {
      if (ev.keyCode === 13) {
        (props.onenter || noop)(ev.target.value, ev);
      }
      (props.onkeydown || noop)(ev.target.value, ev);
    },
    multiple: props.multiple ? 'multiple' : undefined,
    style: props.inputStyle
  }, assignProps);
};

const toggleable = props => h('div', {className: 'osjs-gui-input-toggle'}, [
  h('label', {}, [
    h('input', createProps({
      checked: !!props.value
    }, props, ['checked'])),
    h('span', {}, props.label || `(${props.type})`)
  ])
]);

const types = {
  checkbox: toggleable,

  radio: toggleable,

  textarea: props => h('textarea', createProps({}, props, ['type'])),

  select: props => {
    const choices = props.choices || {};
    const children = Object.keys(choices)
      .map(value => h('option', {
        value,
        selected: props.value == value ? 'selected' : undefined
      }, choices[value]));

    const getValue = ev => Object.keys(choices)[ev.target.selectedIndex];

    return h('select', createProps({
      onchange: ev => (props.onchange || noop)(getValue(ev), ev)
    }, props, ['type']), children);
  }
};

/**
 * A input field
 * @param {Object} props Properties
 * @param {String} props.type The input type (text, textarea, select, radio, checkbox)
 * @param {String} [props.class] Append this className
 * @param {Object} [props.style] CSS Style object
 * @param {Boolean} [props.placeholder] Placeholder attribute
 * @param {Boolean} [props.disabled] Disabled attribute
 * @param {Boolean} [props.multiple] Multiple attribute
 * @param {Boolean} [props.value] Value attribute
 * @param {Boolean} [props.readOnlye] Read Only attribute
 * @param {Object} [props.inputStyle] CSS Style object for input
 * @param {Map<String, String>} [props.choices] Dropdown/Select choices
 * @param {Function} [props.onchange] Change event => (value, ev)
 * @param {Function} [props.oninput] Input event => (value, ev)
 * @param {Function} [props.onenter] Enter event => (value, ev)
 */
const Input = props => h('div', {
  class: className('osjs-gui-input', props, `osjs-gui-input-${props.type}`),
  style: props.style
}, [
  types[props.type]
    ? types[props.type](props)
    : h('input', createProps({
      type: props.type || 'text'
    }, props))
]);

export default Input;
