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
import {doubleTap} from '../utils';
import {Element} from './Element';
import {Icon} from './Icon';

const tapper = doubleTap();

export const IconViewEntry = (entry, index, props) => () => {
  const icon = entry.icon || {name: 'application-x-executable'};
  const selected = props.selectedIndex === index;

  return h('div', {
    class: 'osjs-gui-icon-view-entry' + (selected ? ' osjs__active' : ''),
    ontouchstart: (ev) => tapper(ev, () => props.onactivate({data: entry.data, index, ev})),
    ondblclick: (ev) => props.onactivate({data: entry.data, index, ev}),
    onclick: (ev) => props.onselect({data: entry.data, index, ev}),
    oncontextmenu: (ev) => props.oncontextmenu({data: entry.data, index, ev}),
    oncreate: (el) => props.oncreate({data: entry.data, index, el})
  }, [
    h('div', {class: 'osjs__container'}, [
      h('div', {class: 'osjs__image'}, [
        h(Icon, icon)
      ]),
      h('div', {class: 'osjs__label'}, [
        h('span', {}, entry.label)
      ])
    ])
  ]);
};

export const IconView = (props) => {
  const inner = h('div', {
    class: 'osjs-gui-icon-view-wrapper',
    oncreate: el => (el.scrollTop = props.scrollTop),
    onupdate: el => {
      if (props.selectedIndex < 0) {
        el.scrollTop = props.scrollTop;
      }
    }
  }, props.entries.map((entry, index) => {
    return h(IconViewEntry(entry, index, props));
  }));

  return h(Element, Object.assign({
    class: 'osjs-gui-icon-view'
  }, props.box || {}), inner);
};

export const iconView = ({
  component: (state, actions) => {
    const newProps = Object.assign({
      entries: [],
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
      },
      oncreate: (args) => {
        actions.created(args);
      }
    }, state);

    return (props = {}) => IconView(Object.assign(newProps, props));
  },

  state: state => Object.assign({
    selectedIndex: -1,
    scrollTop: 0
  }, state),

  actions: actions => Object.assign({
    select: () => () => ({}),
    activate: () => () => ({}),
    contextmenu: () => () => ({}),
    created: () => () => ({}),
    setEntries: entries => () => ({entries}),
    setScrollTop: scrollTop => state => ({scrollTop}),
    setSelectedIndex: selectedIndex => state => ({selectedIndex}),
  }, actions || {})
});
