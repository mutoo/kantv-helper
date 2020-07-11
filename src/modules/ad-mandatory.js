import { getVueInstance, detectElement } from '../utils';

export default function adMandatory() {
  return getVueInstance('#vjs-mandatory-advertisement')
    .then(vue => {
      // Ensure that the audio for the ad is muted
      detectElement(".vjs-mandatory-advertisement__video").then(element => {
        element.muted = true;
      })

      if (!vue.advertising) {
        console.log('no ad on this video.');
        return;
      }

      // allow close mandatory ad
      vue.advertising.closeMandatory = true;

      detectElement('#vjs-mandatory-advertisement__close').then((element) => {
        element.click();
        console.log("Ad removed");
      })
    })
    .catch(err => {
      console.warn('mandatory ad vue is not detected.');
    });
}
