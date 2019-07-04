import {getVueInstance} from '../utils';

export default function adMandatory() {
    let vue = getVueInstance('#vjs-pause-advertising');
    if (!vue) {
        console.warn('pause-ad vue is not detected.');
        return;
    }

    // force hide pause ad
    vue.display = false;

    // remove pause ads
    vue.advertising.pause.length = 0;
    vue.formatAdvertising.length = 0;
};
