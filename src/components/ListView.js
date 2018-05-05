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

const defaultRow = {
  active: false,
  data: null,
  columns: []
};

const getColumn = iter => typeof iter === 'string' || !iter
  ? {label: iter}
  : Object.assign({}, iter); // FIXME

const convertRows = rows => rows.map(row => {
  if (row instanceof Array) {
    row = Object.assign({}, defaultRow, {
      data: row,
      columns: row
    });
  } else {
    row = Object.assign({}, defaultRow, row);
  }

  row.columns = row.columns.map(getColumn);
  return row;
});

const cols = (paneIndex, props) => (row, rowIndex) => {
  const col = row.columns[paneIndex] || {};
  const selected = props.selectedIndex === rowIndex;
  const colIcon = col.icon ? icon(col.icon) : null;
  const children = [h('span', {}, [col.label])];

  if (colIcon) {
    children.unshift(colIcon);
  }

  return h('div', {
    'data-has-icon': col.icon ? true : undefined,
    class: 'cell' + (selected ? ' active' : ''),
    ondblclick: (ev) => {
      props.onactivate(row.data, rowIndex, ev);
    },
    onclick: (ev) => {
      props.onselect(row.data, rowIndex, ev);
    },
    oncontextmenu: (ev) => {
      props.onselect(row.data, rowIndex, ev);
      props.oncontextmenu(row.data, rowIndex, ev);
    }
  }, children);
};

const pane = (index, col, props) => h('div', {class: 'pane'}, [
  h('div', {
    class: 'header',
    style: {
      display: props.hideColumns ? 'none' : undefined
    }
  }, getColumn(col).label),
  h('div', {class: 'rows'}, props.rows.map(cols(index, props)))
]);

const view = props => h('div', {
  class: 'osjs-gui-list-view-wrapper',
  oncreate: el => (el.scrollTop = props.scrollTop),
  onupdate: el => {
    if (props.selectedIndex < 0) {
      el.scrollTop = props.scrollTop;
    }
  }
}, props.columns.map((c, i) => pane(i, c, props)));

const ListView = props => {
  const newProps = Object.assign({
    hideColumns: false,
    selectedIndex: -1,
    scrollTop: 0,
    columns: [],
    rows: [],
    onactivate: function() {},
    onselect: function() {},
    oncontextmenu: function() {}
  }, props);

  newProps.rows = convertRows(newProps.rows);

  return h('div', {
    class: className('osjs-gui-list-view', props),
  }, view(newProps));
};

export default ListView;
