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

import {h, app} from 'hyperapp';
import Menu from './components/Menu';

const clampPosition = (root, ev) => {
  const ul = ev.target.querySelector('ul');
  if (!ul || !ul.offsetParent) {
    return;
  }

  ul.classList.remove('clamp-right');

  const rect = ul.getBoundingClientRect();
  const right = rect.x + rect.width;
  if (right > root.offsetWidth) {
    ul.classList.add('clamp-right');
  }
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

export default class ContextMenu {

  constructor(core) {
    this.core = core;
    this.callback = () => {};
    this.actions = null;
  }

  destroy() {
    this.callback = null;
    this.actions = null;
  }

  init() {
    this.actions = app({
      visible: false,
      menu: [],
      position: {
        top: 0,
        left: 0
      }
    }, {
      onshow: (ev) => props => {
        setTimeout(() => clampPosition(this.core.$root, ev), 1);
      },
      show: (options) => props => {
        let {menu, position} = options;
        if (position instanceof Event) {
          position = {left: position.clientX, top: position.clientY};
        } else if (position instanceof Element) {
          const box = position.getBoundingClientRect();
          position = {
            left: box.x,
            top: box.y + box.height
          };
        }

        this.callback = (...args) => {
          if (options.callback) {
            options.callback(...args);
          }

          this.actions.hide();
        };

        return {visible: true, menu, position};
      },
      hide: () => props => {
        this.callback = null;

        return {visible: false};
      }
    }, view((...args) => {
      if (!this.core.destroyed) {
        if (this.callback) {
          this.callback(...args);
        }
      }
    }), this.core.$root);
  }

  show(...args) {
    return this.actions ? this.actions.show(...args) : null;
  }

  hide(...args) {
    return this.actions ? this.actions.hide(...args) : null;
  }
}
