// skip qrcode
(function() {
    let qr = document.querySelector('#vjs-qr-code');
    let qrVue = qr && qr.__vue__;
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

// skip ad
(function() {
    let ad = document.querySelector('#vjs-mandatory-advertisement');
    let adVue = ad && ad.__vue__;
    if (!adVue) {
        return 'ad vue is not detected.';
    }
    if (adVue.advertising) {
        if (adVue.advertisingTimer)
            clearInterval(adVue.advertisingTimer);
        adVue.endOfAdvertisement();
        adVue.empty();
    } else {
        console.log('No ad detected.');
    }
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
