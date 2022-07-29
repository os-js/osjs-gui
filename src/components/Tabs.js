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
import nestable from 'hyperapp-nestable';

const headers = ({labels, onchange, oncontextmenu}, state, actions) => (labels || [])
  .map((label, index) => h('div', {
    class: state.selectedIndex === index ? 'osjs__active' : '',
    oncontextmenu: ev => {
      (oncontextmenu || function() {})(ev, index, label);
    },
    onclick: ev => {
      actions.setSelectedIndex(index);
      (onchange || function() {})(ev, index, label);
    }
  }, h('span', {}, label)));

const panes = (state, children) => children
  .map((child, index) => h('div', {
    class: state.selectedIndex === index ? 'osjs__active' : ''
  }, child));

const view = nestable({
  selectedIndex: 0
}, {
  init: props => ({
    selectedIndex: props.selectedIndex || 0
  }),
  setSelectedIndex: selectedIndex => state => ({selectedIndex})
}, (state, actions) => (props, children) => h('div', {
  class: 'osjs-gui-tabs-wrapper'
}, [
  h('div', {class: 'osjs-gui-tabs-header'}, headers(props, state, actions)),
  h('div', {class: 'osjs-gui-tabs-panes'}, panes(state, children))
]), 'div');

/**
 * A tab container
 * @param {Object} props Properties
 * @param {String[]} props.labels Labels
 * @param {h[]} children Tabs
 */
export const Tabs = (props, children) => h(view, Object.assign({
  class: 'osjs-gui osjs-gui-tabs ' + (props.class || '')
}, props), children);
