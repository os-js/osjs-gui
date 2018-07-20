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
import {filteredProps} from '../utils';
import {Element} from './Element';
import {Icon} from './Icon';

const createView = props => {

  const cols = (paneIndex) => (row, rowIndex) => {
    const col = row.columns[paneIndex] || {};
    const selected = props.selectedIndex === rowIndex;
    const colIcon = col.icon ? h(Icon, col.icon) : null;
    const children = [h('span', {}, [typeof col === 'object' ? col.label : col])];

    if (colIcon) {
      children.unshift(colIcon);
    }

    return h('div', {
      'data-has-icon': col.icon ? true : undefined,
      class: 'osjs-gui-list-view-cell' + (selected ? ' osjs__active' : ''),
      ondblclick: (ev) => props.onactivate({data: row.data, index: rowIndex, ev}),
      onclick: (ev) => props.onselect({data: row.data, index: rowIndex, ev}),
      oncontextmenu: (ev) => props.oncontextmenu({data: row.data, index: rowIndex, ev})
    }, children);
  };

  const pane = (index, col) => h('div', {class: 'osjs-gui-list-view-pane'}, [
    h('div', {
      class: 'osjs-gui-list-view-header',
      style: {
        display: props.hideColumns ? 'none' : undefined
      }
    }, typeof col === 'object' ? col.label : col),
    h('div', {class: 'rows'}, props.rows.map(cols(index)))
  ]);

  return h('div', {
    class: 'osjs-gui-list-view-wrapper',
    oncreate: el => (el.scrollTop = props.scrollTop),
    onupdate: el => {
      if (props.selectedIndex < 0) {
        el.scrollTop = props.scrollTop;
      }
    }
  }, props.columns.map((c, i) => pane(i, c)));
};

export const ListView = props => h(Element, Object.assign({
  class: 'osjs-gui-list-view'
}, props.box || {}), createView(filteredProps(props, ['box'])));

export const listView = ({
  component: (state, actions) => {
    const newProps = Object.assign({
      columns: [],
      rows: [],
      onselect: ({data, index, ev}) => {
        actions.select({data, index, ev});
        actions.setSelectedIndex(index);
      },
      onactivate: ({data, index, ev}) => {
        actions.activate({data, index, ev});
        actions.setSelectedIndex(-1);
      },
      oncontextmenu: ({data, index, ev}) => {
        actions.select({data, index, ev});
        actions.contextmenu({data, index, ev});
        actions.setSelectedIndex(index);
      }
    }, state);

    return (props = {}) => ListView(Object.assign(newProps, props));
  },

  state: state => Object.assign({
    selectedIndex: -1,
    scrollTop: 0
  }, state),

  actions: actions => Object.assign({
    select: () => () => ({}),
    activate: () => () => ({}),
    contextmenu: () => () => ({}),
    setRows: rows => ({rows}),
    setColumns: columns => ({columns}),
    setScrollTop: scrollTop => state => ({scrollTop}),
    setSelectedIndex: selectedIndex => state => ({selectedIndex})
  }, actions || {})
});
