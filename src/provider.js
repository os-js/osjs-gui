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

import {ContextMenu} from './contextmenu.js';

/*
 * Check if a target allows for context menu
 */
const validContextMenuTarget = ev => {
  const target = ev.target;
  let isValid = target.tagName === 'TEXTAREA';
  if (!isValid && target.tagName === 'INPUT') {
    isValid = ['text', 'password', 'number', 'email'].indexOf(target.type) !== -1;
  }

  return isValid;
};

/**
 * OS.js GUI Service Provider
 *
 * @desc Provides wrapper services around GUI features
 */
export class GUIServiceProvider {

  constructor(core) {
    this.core = core;
    this.contextmenu = new ContextMenu(core);
  }

  destroy() {
    const menu = document.getElementById('osjs-context-menu');
    if (menu) {
      menu.remove();
    }

    this.contextmenu.destroy();
  }

  async init() {
    const contextmenuApi = {
      show: (...args) => this.contextmenu.show(...args),
      hide: (...args) => this.contextmenu.hide(...args)
    };

    this.core.instance('osjs/contextmenu', (...args) => {
      if (args.length) {
        return contextmenuApi.show(...args);
      }

      return contextmenuApi;
    });

    this.core.$root.addEventListener('contextmenu', (ev) => {
      if (validContextMenuTarget(ev)) {
        return;
      }

      ev.stopPropagation();
      ev.preventDefault();
    });
  }

  start() {
    const callback = ev => {
      const menu = document.getElementById('osjs-context-menu');
      const hit = menu && menu.contains(ev.target);

      if (!hit && this.contextmenu) {
        this.contextmenu.hide();
      }
    };

    this.core.$root.addEventListener('click', callback, true);
    this.core.once('destroy', () => {
      this.core.$root.removeEventListener('click', callback, true);
    });

    this.contextmenu.init();
  }
}
