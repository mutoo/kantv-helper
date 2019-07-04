// skip qrcode
(function() {
    let qr = document.querySelector('#vjs-qr-code');
    let qrVue = qr && qr.__vue__;
    if (!qrVue) {
        console.warn('qr vue is not detected.');
        return;
    }

    /* request success */
    qrVue.followedSuccess = true;
    qrVue.shareSuccess = true;
    qrVue.ajaxOnOff = true;
    qrVue.type = null;
    // the following line will be done by the type watcher
    // qrVue.$emit('update:displayState', false);
    qrVue.$emit('update:coverAndProhibitPlay', false);
    qrVue.initState.end || qrVue.$emit('update:initState', {
        start: true,
        end: true,
        skipOtherOptions: true,
    });

    /* before destroy */
    clearTimeout(qrVue.requestCodeTimer);
    clearTimeout(qrVue.requestSubscribeTimer);
    clearTimeout(qrVue.expirationTimer);
    clearTimeout(qrVue.teseTimer);

    // no need to force to hide now
    //qrVue.$el.style.display = 'none';
})();

// skip and remove mandatory ad
(function() {
    let ad = document.querySelector('#vjs-mandatory-advertisement');
    let adVue = ad && ad.__vue__;
    if (!adVue) {
        console.warn('mandatory ad vue is not detected.');
        return;
    }
    if (!adVue.advertising) {
        console.log('no ad on this video.');
        return;
    }

    // allow close mandatory ad
    adVue.advertising.closeMandatory = true;

    // remove all mandatory ad
    let adIndexes = Object.keys(adVue.advertising.mandatory);
    for (let i = 0; i < adIndexes.length; i++) {
        adVue.advertising.mandatory[adIndexes[i]].length = 0;
    }

    // check if advertising is playing
    if (adVue.advertisingTimer) {
        adVue.endOfAdvertisement();
        clearInterval(adVue.advertisingTimer);
    } else {
        console.log('ad is not playing.');
    }
})();

// skip and remove pause ad
(function() {
    let ad = document.querySelector('#vjs-pause-advertising');
    let adVue = ad && ad.__vue__;
    if (!adVue) {
        console.warn('pause-ad vue is not detected.');
        return;
    }

    // force hide pause ad
    adVue.display = false;

    // remove pause ads
    adVue.advertising.pause.length = 0;
    adVue.formatAdvertising.length = 0;
})();

// hide page ad
(function() {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    styleSheet.insertRule('#vjs-pause-advertising{display:none!important;}');
    styleSheet.insertRule('.adcontainer{display:none!important;}');
    styleSheet.insertRule('.mtg-client_left{display:none!important;}');
    styleSheet.insertRule('.mtg-client_right{display:none!important;}');
})();
