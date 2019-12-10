import { getVueInstance } from '../utils';

export default function keyControls(vjs) {
    if (!vjs) {
        console.warn('could not detect vjs');
        return;
    }

    window.addEventListener('keyup', (e) => {
        if (e.target instanceof HTMLInputElement) {
            // ignore the key events in the input element
            return;
        }
        let rate = vjs.playbackRate();
        let currentTime = vjs.currentTime();
        let duration = vjs.duration();
        let skip = 10;
        switch (e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                vjs.playbackRate(parseInt(e.key));
                break;
            case '-':
                vjs.playbackRate(Math.max(0, rate - 0.25));
                break;
            case '=':
                vjs.playbackRate(Math.min(rate + 0.25, 10));
                break;
            case 'f':
                if (vjs.isFullscreen()) {
                    vjs.exitFullscreen();
                } else {
                    vjs.requestFullscreen();
                }
                break;
            case 'n':
                let vue = getVueInstance('#vjs-next-part');
                if (vue) {
                    vue.$emit('on-click'); // trigger next
                }
                break;
            case ',':
                vjs.currentTime(Math.max(0, currentTime - skip));
                break;
            case '.':
                vjs.currentTime(Math.min(currentTime + skip, duration));
                break;
            case '<':
                vjs.currentTime(Math.max(0, currentTime - skip * 2));
                break;
            case '>':
                vjs.currentTime(Math.min(currentTime + skip * 2, duration));
                break;
        }
    });
}