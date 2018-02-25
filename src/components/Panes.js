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
import {boxProps, className} from '../utils';

const panes = (props, children, bp) => {
  const orientation = bp.style.flexDirection === 'row' ? 'vertical' : 'horizontal';

  const spacers = Array(Math.ceil(children.length / 2))
    .fill(null)
    .map(() => h('div', {
      class: 'spacer',
      onmousedown: ev => props.onmousedown(ev, props, orientation)
    }));

  const child = (c, i) => {
    const w = props.sizes[i] ? String(props.sizes[i]) + 'px' : undefined;

    return h('div', {
      class: 'pane',
      style: {
        width: w,
        flexBasis: w
      }
    }, c);
  };

  return children
    .map(child)
    .map((v, i) => [v, spacers[i]])
    .reduce((a, b) => a.concat(b))
    .filter(v => typeof v !== 'undefined');
};

const Panes = (props, children) => {
  const bp = boxProps('osjs-gui-panes', props, 'vertical');
  return h('div', bp, panes(props, children, bp));
};

export default Panes;
