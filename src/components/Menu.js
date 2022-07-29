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
import {Icon} from './Icon';

const ul = (props, children = [], level = 0) => {

  const label = child => {
    const children = [];

    if (child.type === 'checkbox' || typeof child.checked === 'boolean') {
      children.push(h('span', {
        class: 'osjs-gui-menu-checkbox ' + (child.checked ? 'active' : '')
      }));
    } else if (child.icon) {
      children.push(h(Icon, child.icon));
    }

    children.push(h('span', {}, child.label));

    return children;
  };

  const inner = (props, child) => {
    if (typeof child.element === 'function') {
      return child.element();
    }

    const className = child.type === 'separator'
      ? 'osjs-gui-menu-separator'
      : 'osjs-gui-menu-label ' + (child.disabled ? 'osjs__disabled' : '');

    const children = [
      h('span', {class: className}, label(child))
    ];

    if (child.items) {
      children.push(ul(props, child.items, level + 1));
    }

    return children;
  };

  return h('ul', {
    class: ''
  }, children.map(
    child => h('li', {
      class: 'osjs-gui-menu-entry'
    }, [
      h('div', {
        class: 'osjs-gui-menu-container',
        'data-has-image': child.icon ? true : undefined,
        'data-has-children': child.items ? true : undefined,
        onmouseover: child.items ? props.onshow : undefined,
        ontouchend: child.items ? props.onshow : undefined,
        onclick: (ev) => {
          if (child.items) {
            return;
          }

          if (child.onclick) {
            child.onclick(child, ev);
          }

          if (props.onclick) {
            props.onclick(child, ev, child);
          }
        }
      }, inner(props, child))
    ])
  ));
};

/**
 * Menu tree
 * @property {String} label Label
 * @property {String} [icon] Icon source
 * @property {Boolean} [disabled] Disabled state
 * @property {Boolean} [closeable] Disable close on click
 * @property {Function} [element] A callback that returns a virtual DOM element (ex. Hyperapp)
 * @property {Function} onclick Click callback
 * @property {MenuItems} [items] Child items
 * @typedef MenuItems
 */

/**
 * A menu
 * @param {Object} props Properties
 * @param {Boolean} [props.visible=true] Visible property
 * @param {Object} [posprops.ition] Position
 * @param {MenuItems} [props.menu] Menu items
 */
export const Menu = (props) => h('div', {
  id: 'osjs-context-menu',
  className: 'osjs-gui osjs-gui-menu',
  oncreate: props.oncreate,
  onupdate: props.onupdate,
  style: {
    display: props.visible !== false ? 'block' : 'none',
    top: props.position ? String(props.position.top) + 'px' : 0,
    left: props.position ? String(props.position.left) + 'px' : 0
  }
}, ul(props, props.menu));
