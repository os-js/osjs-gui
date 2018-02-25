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

const label = cell => cell
  ? (typeof cell === 'object' ? cell.label : String(cell))
  : '';

const cellClassName = (props, rowIndex) => [
  'cell',
  props.selectedIndex === rowIndex ? 'active' : ''
].join(' ').trim();

const cell = (props, rowIndex, columnIndex, iter, data) => h('div', {
  class: cellClassName(props, rowIndex),
  'data-has-icon': iter.icon ? true: undefined,
  style: {
    backgroundImage: iter.icon ? `url(${iter.icon})` : undefined
  },
  ondblclick: (ev) => {
    if (props.onactivate) {
      props.onactivate(data, rowIndex);
    }
  },
  onclick: (ev) => {
    if (props.onselect) {
      props.onselect(data, rowIndex);
    }
  }
}, h('span', {}, iter.label));

const cols = (props, col, columnIndex) => [
  h('div', {
    class: 'header',
    style: {
      display: props.hideColumns ? 'none' : undefined
    }
  }, h('span', {}, label(col))),

  h('div', {
    class: 'overflow'
  }, props.rows.map((row, rowIndex) => {
    let iter;
    let data;
    if (row instanceof Array) {
      data = row[columnIndex];
      iter = {label: row[columnIndex]};
    } else if (typeof row === 'object') {
      iter = row.columns[columnIndex];

      if (iter === null || typeof iter !== 'object') {
        iter = {label: iter};
      }

      data = row.data || iter.label;
    } else {
      iter = {label: row};
      data = row;
    }


    return cell(props, rowIndex, columnIndex, iter, data);
  }))
];

const panes = (props) => (col, columnIndex) => h('div', {
  className: 'pane',
  style: {width: '150px'} // FIXME
}, cols(props, col, columnIndex))

const ListView = props =>
  h('div', {
    class: className('osjs-gui-list-view', props),
  }, props.columns.map(panes(props)));

export default ListView;
