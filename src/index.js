import { detectElement } from './utils';
import removeAd from './modules/remove-ad'
import keyControls from './modules/key-controls';

(() => {
  removeAd();
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

window.onload = async (event) => {
  // Fire skip adMandatory again upon change in episode name
  let episode = document.getElementById("cPartNum");
  episode.addEventListener("DOMSubtreeModified", () => { removeAd(); });
};
