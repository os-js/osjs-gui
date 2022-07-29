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

import {h, app} from 'hyperapp';
import {Menu} from './components/Menu';

/*
 * Makes sure sub-menus stays within viewport
 */
const clampSubMenu = (root, ev) => {
  let ul = ev.target.querySelector('ul');
  if (!ul) {
    return;
  }

  // FIXME: Safari reports wrong item
  if (ul.classList.contains('osjs-gui-menu-container')) {
    ul = ul.parentNode.parentNode;
  }

  if (!ul || !ul.offsetParent) {
    return;
  }

  ul.classList.remove('clamp-right');

  const rect = ul.getBoundingClientRect();
  if (rect.right > root.offsetWidth) {
    ul.classList.add('clamp-right');
  }
};

/*
 * Makes sure menu stays within viewport
 */
const clampMenu = (root, el, currentPosition) => {
  const result = {};
  const bottom = currentPosition.top + el.offsetHeight;
  const right = currentPosition.left + el.offsetWidth;
  const offY = root.offsetHeight - currentPosition.top;
  const offX = root.offsetWidth - currentPosition.left;
  const overflowRight = right > root.offsetWidth;
  const overflowBottom = bottom > root.offsetHeight;

  if (overflowBottom) {
    if (root.offsetHeight > el.offsetHeight) {
      result.top = root.offsetHeight - el.offsetHeight - offY;
    }
  }

  if (overflowRight) {
    result.left = root.offsetWidth - el.offsetWidth - offX;
  }

  return (overflowBottom || overflowRight) ? result : null;
};

/*
 * Context Menu view
 */
const view = callback => (props, actions) => h(Menu, {
  position: props.position,
  visible: props.visible,
  menu: props.menu,
  onclick: callback,
  onshow: actions.onshow
});

const timeout = fn => {
  fn();
  return setTimeout(fn, 100);
};

/**
 * ContextMenu Class
 *
 * @desc Handles a Menu/ContextMenu globally for OS.js
 */
export class ContextMenu {

  constructor(core) {
    this.core = core;
    this.callback = () => {};
    this.actions = null;
    this.$element = document.createElement('div');
  }

  destroy() {
    this.callback = null;
    this.actions = null;
  }

  /**
   * Initializes the Menu Hyperapp
   */
  init() {
    let clampTimeout;

    this.$element.className = 'osjs-system-context-menu';
    this.core.$root.appendChild(this.$element);

    let isActive = false;

    this.actions = app({
      visible: false,
      menu: [],
      position: {
        top: 0,
        left: 0
      }
    }, {
      clamp: (el) => props => {
        el = el || document.querySelector('#osjs-context-menu');
        clearTimeout(clampTimeout);

        if (el) {
          const root = this.core.$root;
          const newPosition = clampMenu(root, el, props.position);
          if (newPosition) {
            return {position: newPosition};
          }
        }

        return {};
      },
      onshow: (ev) => props => {
        clampTimeout = timeout(() => clampSubMenu(this.core.$root, ev));
      },
      show: (options) => (props, actions) => {
        let {menu, position, toggle} = options;
        if (toggle && isActive) {
          return actions.hide();
        } else if (position instanceof Event) {
          position = {left: position.clientX, top: position.clientY};
        } else if (position instanceof Element) {
          const box = position.getBoundingClientRect();
          position = {
            left: box.left,
            top: box.top + box.height
          };
        }

        this.callback = (child, ev, iter) => {
          if (options.callback) {
            options.callback(child, ev);
          }

          if (iter.closeable !== false) {
            actions.hide();
          }
        };

        isActive = true;
        this.onclose = options.onclose;

        timeout(() => actions.clamp());

        return {
          visible: true,
          menu: menu || [],
          position: position || {top: 0, left: 0}
        };
      },
      hide: () => props => {
        if (isActive) {
          setTimeout(() => (isActive = false), 0);
        }
        if (this.onclose) {
          this.onclose();
        }
        this.onclose = null;
        this.callback = null;

        return {visible: false};
      }
    }, view((...args) => {
      if (!this.core.destroyed) {
        if (this.callback) {
          this.callback(...args);
        }
      }
    }), this.$element);
  }

  /**
   * Show the menu
   */
  show(...args) {
    return this.actions ? this.actions.show(...args) : null;
  }

  /**
   * Hide the menu
   */
  hide(...args) {
    return this.actions ? this.actions.hide(...args) : null;
  }
}
