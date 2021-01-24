import { getVueInstance } from '../utils';

export default function today() {
    return getVueInstance('.vjs-jinriaozhou')
        .then(vue => {
            /* request success */
            vue.followedSuccess = true;
            vue.visible = false;
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
            clearTimeout(vue.requestSubscribeTimer);
            clearTimeout(vue.teseTimer);
        })
        .catch(err => {
            console.warn('jinriaozhou vue is not detected.');
        });
}
