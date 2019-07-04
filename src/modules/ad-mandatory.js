import {getVueInstance} from '../utils';

export default function adMandatory() {
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
        vue.advertising.mandatory[adIndexes[i]].length = 0;
    }

    // check if advertising is playing
    if (vue.advertisingTimer) {
        vue.endOfAdvertisement();
        clearInterval(vue.advertisingTimer);
    } else {
        console.log('ad is not playing.');
    }
};
