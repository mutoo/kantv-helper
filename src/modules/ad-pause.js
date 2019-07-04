import {getVueInstance} from '../utils';

export default function adMandatory() {
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
};
