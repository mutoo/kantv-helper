(function() {
    // skip ad
    let ad = document.querySelector('#vjs-mandatory-advertisement');
    let adVue = ad.__vue__;
    if (!adVue) {
        return 'ad vue is not detected.';
    }
    if (adVue.currentAdvertisingIndex !== -1) {
        if (adVue.advertisingTimer)
            clearInterval(adVue.advertisingTimer);
        adVue.endOfAdvertisement();
    } else {
        console.log('No ad detected.');
    }
})();

(function() {
    // skip qrcode
    let qr = document.querySelector('#vjs-qr-code');
    let qrVue = qr.__vue__;
    if (!qrVue) {
        return 'qr vue is not detected.';
    }
    qrVue.followedSuccess = true;
    qrVue.ajaxOnOff = true;
    qrVue.$emit('update:displayState', false);
    qrVue.$emit('update:coverAndProhibitPlay', false);
    qrVue.initState.end || qrVue.$emit('update:initState', {
        start: true,
        end: true,
        skipOtherOptions: true,
    });
    clearTimeout(qrVue.requestSubscribeTimer);

    // force to hide
    qrVue.$el.style.display = 'none';
})();

(function() {
    // hide pause ad
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    styleSheet.insertRule('#vjs-pause-advertising{display:none!important;}');
})();
