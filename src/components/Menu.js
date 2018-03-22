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

const ul = (props, children = []) => h('ul', {}, children.map(
  child => h('li', {}, [
    h('div', {
      'data-has-image': child.icon ? true : undefined,
      'data-has-children': child.items ? true : undefined,
      onclick: (ev) => {
        if (child.items) {
          return;
        }

        if (child.onclick) {
          child.onclick(child, ev);
        }

        if (props.onclick) {
          props.onclick(child, ev);
        }
      }
    }, [
      h('span', {
        style: {
          backgroundImage: child.icon ? `url(${child.icon})` : undefined
        }
      }, child.label),
      child.items ? ul(props, child.items) : null
    ].filter(c => !!c))
  ])
));

const Menu = (props) => h('div', {
  id: 'osjs-context-menu',
  className: 'osjs-gui osjs-gui-menu',
  style: {
    display: props.visible !== false ? 'block' : 'none',
    top: props.position ? String(props.position.top) + 'px' : 0,
    left: props.position ? String(props.position.left) + 'px' : 0
  }
}, [
  ul(props, props.menu)
]);

export default Menu;
