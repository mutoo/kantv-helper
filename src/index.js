import { detectElement } from './utils';
import qrcode from './modules/qrcode';
import adMandatory from './modules/ad-mandatory';
import adPause from './modules/ad-pause';
import styles from './modules/styles';
import keyControls from './modules/key-controls';

(() => {
  adPause();
  adMandatory();
  qrcode();
  styles();
})();

(() => {
  detectElement('.video-js')
    .then(vjs => {
      keyControls(vjs.player);
    })
    .catch(err => {
      console.warn(err);
    });
})();
