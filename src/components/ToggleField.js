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
import {createField} from '../element';

/*
 * Parses option value
 */
const parseValue = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * A text field
 * @param {Object} props Properties
 * @param {string} [props.checked] Value
 * @param {string} [props.type=checkbox] Type
 * @param {BoxProperties} [props.box] Box Properties
 * @param {h[]} children Children
 */
export const ToggleField = (props = {}, children = []) =>
  createField('toggle-field', props, {
    type: 'checkbox',
    checked: false
  }, (fieldProps) => h('label', {

  }, [
    h('input', fieldProps),
    h('span', {
      class: 'osjs-toggle-input'
    }),
    h('span', {
      class: 'osjs-toggle-label'
    }, [
      props.label || '',
      ...children
    ])
  ]), ev => [props.type === 'radio'
    ? parseValue(ev.target.value)
    : !!ev.target.checked]);
