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

const isUnset = (value) => typeof value === 'undefined' || value === -1

const isSelected = (props, index) => isUnset(props.selectedIndex)
  ? index === 0
  : index === props.selectedIndex;

const headers = (props, children) => (props.labels || [])
  .map((label, index) => h('div', {
    class: isSelected(props, index) ? 'active' : '',
    onclick: ev => (props.onchange || function() {})(index, ev)
  }, h('span', {}, label)));

const panes = (props, children) => children
  .map((child, index) => h('div', {
    style: {
      display: isSelected(props, index) ? 'block' : 'none'
    }
  }, child));

/**
 * A tab container
 * @param {Object} props Properties
 * @param {String[]} props.labels Labels
 * @param {h[]} children Tabs
 */
const Tabs = (props, children) =>
  h('div', {
    class: 'osjs-gui osjs-gui-tabs'
  }, [
    h('div', {class: 'header'}, headers(props, children)),
    h('div', {class: 'panes'}, panes(props, children))
  ]);

export default Tabs;
