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
import {Element} from './Element';

const onmousedown = (ev, actions, orientation) => {
  const {target, clientX, clientY} = ev;
  const pane = target.previousSibling;
  const {offsetWidth, offsetHeight} = pane;
  const index = Array.from(target.parentNode.children).indexOf(pane);
  const maxWidth = pane.parentNode.offsetWidth * 0.8;
  const maxHeight = pane.parentNode.offsetHeight * 0.8;

  if (index < 0) {
    return;
  }

  const mousemove = ev => {
    ev.preventDefault();

    let size = orientation === 'vertical' ? offsetWidth : offsetHeight;

    if (orientation === 'vertical') {
      const diffX = ev.clientX - clientX;
      size = Math.min(maxWidth, size + diffX);
    } else {
      const diffY = ev.clientY - clientY;
      size = Math.min(maxHeight, size + diffY);
    }

    actions.setSize({index, size});
  };

  const mouseup = ev => {
    ev.preventDefault();
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };

  ev.preventDefault();
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);
};

const panes = (state, actions, children, orientation) => {
  const spacers = Array(Math.ceil(children.length / 2))
    .fill(null)
    .map(() => h('div', {
      class: 'osjs-gui-panes-spacer',
      onmousedown: ev => onmousedown(ev, actions, orientation)
    }));

  const child = (c, i) => {
    const w = state.sizes[i] ? String(state.sizes[i]) + 'px' : undefined;

    return h('div', {
      class: 'osjs-gui-panes-pane',
      style: {
        flex: w ? `0 0 ${w}` : w
      }
    }, c);
  };

  return children
    .map(child)
    .map((v, i) => [v, spacers[i]])
    .reduce((a, b) => a.concat(b))
    .filter(v => typeof v !== 'undefined');
};

const view = (state, actions) => (props, children) => {
  const orientation = props.orientation || 'vertical';

  return h(Element, {
    orientation,
    class: 'osjs-gui-panes-inner'
  }, panes(state, actions, children, orientation));
};

const inner = nestable({
  sizes: []
}, {
  init: props => ({sizes: props.sizes || [150]}),
  setSize: ({index, size}) => state => {
    const sizes = [].concat(state.sizes);
    sizes[index] = size;
    return {sizes};
  }
}, view, 'div');

/**
 * Resizable panes
 * @param {Object} props Properties
 * @param {string} [props.orientation='vertical'] Pane orientation
 * @param {number[]} [props.sizes] Pane sizes
 * @param {h[]} children Children
 */
export const Panes = (props, children) => h(inner, {
  class: 'osjs-gui-panes'
}, children);
