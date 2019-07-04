import {getVueInstance} from '../utils';

export default function qrCode() {
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
