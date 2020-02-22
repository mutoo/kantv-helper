// ==UserScript==
// @name         kantv-helper
// @namespace    im.mutoo.kantv-helper
// @website      https://mutoo.github.com/kantv-helper/
// @updateURL    https://mutoo.github.com/kantv-helper/dist/kantv-helper.meta.js
// @downloadURL  https://mutoo.github.com/kantv-helper/dist/kantv-helper.user.js
// @supportURL   https://github.com/mutoo/kantv-helper/issues
// @version      1.0.11
// @description  Customized scripts for kantv, skipping qrCode, removing ads, etc.
// @author       Mutoo <gmutoo@gmail.com>
// @match        http*://www.imkan.tv/tvdrama/*
// @match        http*://www.imkan.tv/movie/*
// @match        http*://www.imkan.tv/show/*
// @match        http*://www.imkan.tv/anime/*
// @match        http*://www.imkan.tv/child/*
// @match        http*://www.imkan.tv/documentary/*
// @match        http*://www.wekan.tv/tvdrama/*
// @match        http*://www.wekan.tv/movie/*
// @match        http*://www.wekan.tv/show/*
// @match        http*://www.wekan.tv/anime/*
// @match        http*://www.wekan.tv/child/*
// @match        http*://www.wekan.tv/documentary/*
// @match        http*://www.kantv6.com/tvdrama/*
// @match        http*://www.kantv6.com/movie/*
// @match        http*://www.kantv6.com/show/*
// @match        http*://www.kantv6.com/anime/*
// @match        http*://www.kantv6.com/child/*
// @match        http*://www.kantv6.com/documentary/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

'use strict';

/**
 * get a vue instance from selector
 * @param selector
 * @return {any | null}
 */
function getVueInstance(selector) {
    return detectElement(selector).then(dom => dom.__vue__);
}

/**
 * resolve once a element is on the page
 * @param selector
 * @param interval
 * @param retry
 * @return {Promise<any>}
 */
function detectElement(selector, interval = 500, retry = 10) {
    return new Promise((resolve, reject) => {
        setTimeout(function detect() {
            let dom = document.querySelector(selector);
            if (dom) {
                resolve(dom);
            } else if (retry > 0) {
                setTimeout(detect, interval);
                retry -= 1;
            } else {
                reject(`can not found ${selector} on the page`);
            }
        }, interval);
    });
}

function qrCode() {
  return getVueInstance('#vjs-qr-code')
    .then(vue => {
      /* request success */
      vue.followedSuccess = true;
      vue.shareSuccess = true;
      vue.ajaxOnOff = true;
      vue.type = null;
      // the following line will be done by changing `type`
      // vue.$emit('update:displayState', false);
      vue.$emit('update:coverAndProhibitPlay', false);
      vue.initState.end ||
        vue.$emit('update:initState', {
          start: true,
          end: true,
          skipOtherOptions: true,
        });

      /* before destroy */
      clearTimeout(vue.requestCodeTimer);
      clearTimeout(vue.requestSubscribeTimer);
      clearTimeout(vue.expirationTimer);
      clearTimeout(vue.teseTimer);
    })
    .catch(err => {
      console.warn('qr vue is not detected.');
    });
}

function adMandatory() {
  return getVueInstance('#vjs-mandatory-advertisement')
    .then(vue => {
      if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
      }

      // allow close mandatory ad
      vue.advertising.closeMandatory = true;

      // force finish the first ad
      vue.$set(vue, 'currentAdvertisingTime', parseFloat('Infinity'));

      // remove all mandatory ads
      let adIndexes = Object.keys(vue.advertising.mandatory);
      for (let i = 0; i < adIndexes.length; i++) {
        let mandatory = vue.advertising.mandatory[adIndexes[i]];
        if (mandatory) {
          mandatory.length = 0;
        }
      }
    })
    .catch(err => {
      console.warn('mandatory ad vue is not detected.');
    });
}

function adMandatory$1() {
  return getVueInstance('.vjs-pause-advertising')
    .then(vue => {
      if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
      }

      // force hide pause ad
      vue.display = false;

      // remove pause ads
      if (vue.advertising.pause) vue.advertising.pause.length = 0;

      if (vue.formatAdvertising) vue.formatAdvertising.length = 0;
    })
    .catch(err => {
      console.warn('pause-ad vue is not detected.');
    });
}

function styles() {
    let styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    let styleSheet = styleEl.sheet;
    [
        '.adcontainer',
        '.mtg-client_left',
        '.mtg-client_right',
        '.a-card-item',
    ].forEach(selector => {
        styleSheet.insertRule(`${selector}{display:none!important;}`);
    });
}

function keyControls(vjs) {
    if (!vjs) {
        console.warn('could not detect vjs');
        return;
    }

    window.addEventListener('keyup', e => {
        if (e.target instanceof HTMLInputElement) {
            // ignore the key events in the input element
            return;
        }
        let rate = vjs.playbackRate();
        let currentTime = vjs.currentTime();
        let duration = vjs.duration();
        let skip = 10;
        switch (e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                vjs.playbackRate(parseInt(e.key));
                break;
            case '-':
                vjs.playbackRate(Math.max(0, rate - 0.25));
                break;
            case '=':
                vjs.playbackRate(Math.min(rate + 0.25, 10));
                break;
            case 'f':
                if (vjs.isFullscreen()) {
                    vjs.exitFullscreen();
                } else {
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture();
                    }
                    vjs.requestFullscreen();
                }
                break;
            case 'p':
                if ('pictureInPictureEnabled' in document) {
                    let video = vjs.$('video');
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture();
                    } else {
                        if (vjs.isFullscreen()) {
                            vjs.exitFullscreen();
                        }
                        video.requestPictureInPicture();
                    }
                } else {
                    console.warn(
                        'Picture-in-picture is not supported in this browser.',
                    );
                }
                break;
            case 'n':
                let vue = getVueInstance('#vjs-next-part');
                if (vue) {
                    vue.$emit('on-click'); // trigger next
                }
                break;
            case ',':
                vjs.currentTime(Math.max(0, currentTime - skip));
                break;
            case '.':
                vjs.currentTime(Math.min(currentTime + skip, duration));
                break;
            case '<':
                vjs.currentTime(Math.max(0, currentTime - skip * 2));
                break;
            case '>':
                vjs.currentTime(Math.min(currentTime + skip * 2, duration));
                break;
        }
    });
}

(() => {
  adMandatory$1();
  adMandatory();
  qrCode();
  styles();
})();

(() => {
  detectElement('.video-js')
    .then(vjs => {
      keyControls(vjs.player);
    })
    .catch(err => {
      console.warn(err);
    });
})();
