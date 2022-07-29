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
import {Element} from './Element';
import nestable from 'hyperapp-nestable';

const view = (state, actions) => (props, children) => {
  return h(Element, Object.assign({}, props.box || {}, {
    class: ['osjs-gui-expander-wrapper']
  }), [
    h('div', {
      class: 'osjs-gui-expander-header',
      onclick: ev => actions.ontoggle({
        ev,
        active: !state.active,
        ontoggle: props.ontoggle
      })
    }, [
      h('div', {
        class: 'osjs-gui-expander-header-icon',
        'data-active': String(state.active)
      }),
      h('div', {
        class: 'osjs-gui-expander-header-label'
      }, props.label)
    ]),
    h('div', {
      class: 'osjs-gui-expander-content',
      style: {
        display: state.active === false ? 'none' : undefined
      }
    }, children)
  ]);
};

const inner = nestable({
  active: true
}, {
  init: props => ({
    ative: props.active !== false
  }),
  ontoggle: ({ev, active, ontoggle}) => {
    const cb = ontoggle || function() {};
    cb(ev, active);
    return {active};
  }
}, view, 'div');

/**
 * A status bar
 * @param {Object} props Properties
 * @param {boolean} [props.active] Active state
 * @param {Function} [props.ontoggle] Toggle callback => (ev, active)
 * @param {BoxProperties} [props.box] Box Properties
 * @param {h[]} children Children
 */
export const Expander = (props, children) =>
  h(inner, Object.assign({}, props, {
    class: 'osjs-gui osjs-gui-expander'
  }), children);
