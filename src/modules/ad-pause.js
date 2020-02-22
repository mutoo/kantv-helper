import { getVueInstance } from '../utils';

export default function adMandatory() {
  return getVueInstance('.vjs-pause-advertising')
    .then(vue => {
      if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
      }

      // force hide pause ad
      vue.display = false;

      // remove pause ads
      if (vue.advertising.pause) vue.advertising.pause.length = 0;

      if (vue.formatAdvertising) vue.formatAdvertising.length = 0;
    })
    .catch(err => {
      console.warn('pause-ad vue is not detected.');
    });
}
