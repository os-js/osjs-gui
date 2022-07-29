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

/**
 * Elemet Box definition
 * @property {string} [class] Container class name
 * @property {number} [grow] Flexbox grow value
 * @property {number} [shrink] Flexbox shrink value
 * @property {number|string} [basis] Flexbox basis value
 * @property {string} [align] Flexbox alignItems value
 * @property {string} [justify] Flexbox justifyContent value
 * @property {number|string} [padding] Margin
 * @property {number|string} [margin] Margin
 * @property {string} [key] Hyperapp element key
 * @property {Function} [oncreate] Hyperapp oncreate function
 * @property {Function} [onupdate] Hyperapp onupdate function
 * @property {Function} [ondestroy] Hyperapp ondestroy function
 * @typedef BoxProperties
 */

const unitValue = (value, unset) => typeof value === 'number'
  ? `${value}px`
  : (value === false ? unset : value);

const boxPropNames = {
  grow: value => ({flexGrow: value}),
  shrink: value => ({flexShrink: value}),
  basis: value => ({flexBasis: unitValue(value, 'auto')}),
  align: value => ({alignItems: value}),
  justify: value => ({justifyContent: value}),
  padding: value => ({margin: unitValue(value, '0')}),
  margin: value => ({margin: unitValue(value, '0')})
};

/**
 * A generic OS.js GUI container
 * @param {Object} props Properties
 * @param {h[]} children Children
 */
export const Element = (props, children = []) => {
  const givenClassNames = props.class instanceof Array
    ? props.class
    : [props.class];

  const classNames = [
    'osjs-gui',
    ...givenClassNames
  ];

  if (props.orientation) {
    classNames.push('osjs-gui-' + props.orientation);
  }

  const defaultStyle = typeof props.style === 'string'
    ? {}
    : Object.assign({}, props.style || {});

  const style = Object.keys(props).reduce((result, prop) => {
    const value = boxPropNames[prop]
      ? boxPropNames[prop](props[prop])
      : undefined;

    return Object.assign({}, result, value);
  }, defaultStyle);

  return h('div', {
    oncreate: props.oncreate,
    ondestroy: props.ondestroy,
    class: classNames.filter(s => !!s).join(' '),
    style
  }, children);
};
