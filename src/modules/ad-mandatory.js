import { getVueInstance } from '../utils';

export default function adMandatory() {
    return getVueInstance('#vjs-mandatory-advertisement')
        .then(vue => {
            if (!vue.advertising) {
                console.log('no ad on this video.');
                return;
            }

            // try disable mandatory ad
            vue.advertising.disableMandatory = true;

            // in case that may fail, we also allow user to skip the ad manually
            vue.advertising.closeMandatory = true;

            // move the index to inf and force finish the first ad
            // so it won't play next ad
            vue.$set(vue, 'currentAdvertisingIndex', vue.currentAdvertisingList.length - 1);
            vue.$set(vue, 'currentAdvertisingTime', parseFloat('Infinity'));

            // remove all mandatory ads
            let adIndexes = Object.keys(vue.advertising.mandatory);
            for (let i = 0; i < adIndexes.length; i++) {
                let mandatory = vue.advertising.mandatory[adIndexes[i]];
                if (mandatory) {
                    mandatory.length = 0;
                }
            }
        })
        .catch(err => {
            console.warn('mandatory ad vue is not detected.');
        });
}
