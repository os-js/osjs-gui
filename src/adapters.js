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


// TODO: This is all [probably] just temporary!

const listview = {
  state(props = {}) {
    // TODO: Remove me
    return props;
  },

  actions(actions = {}) {
    return Object.assign({}, actions, {
      setScrollTop: scrollTop => state => ({scrollTop}),
      setSelectedIndex: selectedIndex => state => ({selectedIndex})
    });
  },

  proxy(props, actions) {
    return Object.assign({}, props, {
      onselect: (data, n) => {
        actions.setSelectedIndex(n);
        if (props.onselect) {
          props.onselect(data, n);
        }
      }
    })
  }
};

const panes = {
  state(props = {}) {
    const onmousedown = (ev, props, orientation) => {
      const {target, clientX, clientY} = ev;
      const pane = target.nextSibling;
      const {offsetWidth, offsetHeight} = pane;
      const index = Array.from(target.parentNode.children).indexOf(pane) - 1;

      if (index < 0) {
        return;
      }

      const mousemove = ev => {
        ev.preventDefault();

        let size = orientation === 'vertical' ? offsetWidth : offsetHeight;

        if (orientation === 'vertical') {
          const diffX = ev.clientX - clientX;
          size -= diffX;
        } else {
          const diffY = ev.clientY - clientY;
          size -= diffY;
        }

        props.setSize({index, size});
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

    return Object.assign({}, {
      sizes: props.sizes || [150],
      onmousedown
    }, props);
  },

  actions(actions = {}) {
    return Object.assign({}, actions, {
      setSize: ({index, size}) => state => {
        const sizes = [].concat(state.sizes);
        sizes[index] = size;
        return {sizes};
      }
    });
  },

  proxy(props, actions) {
    return Object.assign({}, props, actions);
  }
};

export {
  listview,
  panes
};
