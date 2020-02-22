import { getVueInstance } from '../utils';

export default function adCorner() {
  return getVueInstance('.vjs-corner-advertisement')
    .then(vue => {
      if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
      }

      // force hide corner ad
      vue.display = false;

      // remove corner ads
      if (vue.advertising.corner) vue.advertising.corner.length = 0;

      if (vue.formatAdvertising) vue.formatAdvertising.length = 0;
    })
    .catch(err => {
      console.warn('pause-ad vue is not detected.');
    });
}
