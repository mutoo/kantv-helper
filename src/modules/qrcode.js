import { getVueInstance } from '../utils';

export default function qrCode() {
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
