import {detectElement} from './utils';
import qrcode from './modules/qrcode';
import adMandatory from './modules/ad-mandatory';
import adPause from './modules/ad-pause';
import styles from './modules/styles';
import keyControls from './modules/key-controls';

(() => {
    detectElement('#vjs-component-box').then((_) => {
        adPause();
        adMandatory();
        qrcode();
        styles();
    });
})();

(() => {
    detectElement('.video-js').then((vjs) => {
        keyControls(vjs.player);
    });
})();