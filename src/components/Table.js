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
import {Element} from './Element';

const data = c => {
  if (typeof c === 'undefined' || c === null) {
    return '';
  } else if (typeof c === 'function') {
    return c();
  } else if (typeof c === 'object') {
    return c.label;
  }

  return String(c);
};

const col = (tagName, onclick) => (c, props = {}, children = []) => h(tagName, props, h('div', {
  onclick
}, [
  h('span', {}, data(c)),
  ...children
]));

const createHeader = ({sortBy, sortDir, columns, onsort}) => h('thead', {}, h('tr', {}, columns.map((c, i) => {
  const active = sortBy === i;

  return col('th', ev => {
    if (typeof onsort === 'function') {
      const dir = !sortDir
        ? 'asc' : (sortDir === 'asc' ? 'desc' : null);

      onsort(ev, i, dir, c);
    }
  })(c, {
    'data-sort': active,
    'data-direction': active ? sortDir : false
  }, [h('span')]);
})));

const createBody = rows => h('tbody', {}, rows.map(columns => h('tr', {}, columns.map(col('td')))));

const createFooter = columns => h('tfoot', {}, h('tr', {}, columns.map(col('td'))));

/**
 * A toolbar
 * @desc Contains entries with spacing
 * @param {BoxProperties} props Properties
 * @param {h[]} children Children
 */
export const Table = (props = {}, children = []) => {
  const newProps = Object.assign({
    columns: [],
    rows: [],
    footer: [],
    sortBy: null,
    sortDir: null,
    fixed: true,
    collapse: true,
    zebra: false
  }, props);

  const boxProps = Object.assign({}, props.box || {}, {
    class: ['osjs-gui-table', props.class]
  });


  return h(Element, boxProps, h('table', {
    'data-collapse': newProps.collapse === true,
    'data-fixed': newProps.fixed === true,
    'data-zebra': newProps.zebra === true
  }, [
    createHeader(newProps),
    createBody([
      ...newProps.rows,
      ...children
    ]),
    createFooter(newProps.footer)
  ]));
};
