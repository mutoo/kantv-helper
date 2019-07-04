// ==UserScript==
// @name         kantv-helper
// @namespace    im.mutoo.kantv-helper
// @website      https://mutoo.github.com/kantv-helper/
// @updateURL    https://mutoo.github.com/kantv-helper/dist/kantv-helper.meta.js
// @downloadURL  https://mutoo.github.com/kantv-helper/dist/kantv-helper.user.js
// @supportURL   https://github.com/mutoo/kantv-helper/issues
// @version      1.0.1
// @description  Customized scripts for kantv, skipping qrCode, removing ads, etc.
// @author       Mutoo <gmutoo@gmail.com>
// @match        http*://www.imkan.tv/tvdrama/*
// @match        http*://www.imkan.tv/movie/*
// @match        http*://www.imkan.tv/show/*
// @match        http*://www.imkan.tv/anime/*
// @match        http*://www.imkan.tv/child/*
// @match        http*://www.imkan.tv/documentary/*
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
    let dom = document.querySelector(selector);
    return dom && dom.__vue__;
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
                reject('can not found element on the page');
            }
        }, interval);
    });
}

function qrCode() {
    let vue = getVueInstance('#vjs-qr-code');
    if (!vue) {
        console.warn('qr vue is not detected.');
        return;
    }

    /* request success */
    vue.followedSuccess = true;
    vue.shareSuccess = true;
    vue.ajaxOnOff = true;
    vue.type = null;
    // the following line will be done by changing `type`
    // vue.$emit('update:displayState', false);
    vue.$emit('update:coverAndProhibitPlay', false);
    vue.initState.end || vue.$emit('update:initState', {
        start: true,
        end: true,
        skipOtherOptions: true,
    });

    /* before destroy */
    clearTimeout(vue.requestCodeTimer);
    clearTimeout(vue.requestSubscribeTimer);
    clearTimeout(vue.expirationTimer);
    clearTimeout(vue.teseTimer);
}

function adMandatory() {
    let vue = getVueInstance('#vjs-mandatory-advertisement');
    if (!vue) {
        console.warn('mandatory ad vue is not detected.');
        return;
    }
    if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
    }

    // allow close mandatory ad
    vue.advertising.closeMandatory = true;

    // remove all mandatory ad
    let adIndexes = Object.keys(vue.advertising.mandatory);
    for (let i = 0; i < adIndexes.length; i++) {
        let mandatory = vue.advertising.mandatory[adIndexes[i]];
        if (mandatory) {
            mandatory.length = 0;
        }
    }

    // check if advertising is playing
    if (vue.advertisingTimer) {
        vue.endOfAdvertisement();
        clearInterval(vue.advertisingTimer);
    } else {
        console.log('ad is not playing.');
    }
}

function adMandatory$1() {
    let vue = getVueInstance('#vjs-pause-advertising');
    if (!vue) {
        console.warn('pause-ad vue is not detected.');
        return;
    }

    if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
    }

    // force hide pause ad
    vue.display = false;

    // remove pause ads
    if (vue.advertising.pause)
        vue.advertising.pause.length = 0;

    if (vue.formatAdvertising)
        vue.formatAdvertising.length = 0;
}

function styles() {
    let styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    let styleSheet = styleEl.sheet;
    [
        '.adcontainer',
        '.mtg-client_left',
        '.mtg-client_right',
    ].forEach(selector => {
        styleSheet.insertRule(`${selector}{display:none!important;}`);
    });
}

(() => {
    detectElement('#vjs-component-box').then((vjsDom) => {
        adMandatory$1();
        adMandatory();
        qrCode();
        styles();
    });
})();
