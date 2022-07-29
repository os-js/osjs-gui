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

const sources = list => list.map(item => h('source', item));

const isTrue = v => typeof v === 'undefined' || v === true;

/**
 * A video
 * @param {Object} props Properties
 * @param {String} [props.class] Append this className
 * @param {Object} [props.style] CSS Style object
 * @param {String} props.src The video source
 * @param {number} [props.width] Video width
 * @param {number} [props.height] Video height
 * @param {String} [props.poster] Poster image source
 * @param {Boolean} [props.loop] Loop video
 * @param {Boolean} [props.autoplay] Autoplay video
 * @param {Boolean} [props.controls] Show controls
 * @param {Function} [props.onloadeddata] On loaded data event
 */
export const Video = (props, children) =>
  h('div', {
    class: 'osjs-gui osjs-gui-video',
    style: {
      width: props.width ? String(props.width) + 'px' : undefined,
      height: props.height ? String(props.height) + 'px' : undefined
    }
  }, [
    h('video', {
      src: props.src,
      width: props.width,
      height: props.height,
      poster: props.poster,
      loop: props.loop ? 'loop' : undefined,
      muted: props.muted ? 'muted' : undefined,
      controls: isTrue(props.controls) ? 'controls' : undefined,
      autoplay: isTrue(props.autoplay) ? 'autoplay' : undefined,
      onloadeddata: props.onload,
      oncreate: props.oncreate,
      onupdate: props.onupdate,
      ondestroy: props.ondestroy
    }, sources(props.sources || []))
  ]);
