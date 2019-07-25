export default function qrCode(vjs) {
    if (!vjs) {
        console.warn('could not detect vjs');
        return;
    }

    window.addEventListener('keyup', (e) => {
        let rate = vjs.playbackRate();
        let currentTime = vjs.currentTime();
        let duration = vjs.duration();
        let skip = 5;
        if (e.shiftKey) skip *= 2;
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
            case 'ArrowLeft':
                vjs.currentTime(Math.max(0, currentTime - skip));
                break;
            case 'ArrowRight':
                vjs.currentTime(Math.min(currentTime + skip, duration));
                break;
        }
    });
}