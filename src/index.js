import {detectElement} from './utils';
import qrcode from './modules/qrcode';
import adMandatory from './modules/ad-mandatory';
import adPause from './modules/ad-pause';
import styles from './modules/styles';

(() => {
    detectElement('#vjs-component-box').then((vjsDom) => {
        adPause();
        adMandatory();
        qrcode();
        styles();
    });
})();
