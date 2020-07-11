import qrcode from './qrcode';
import today from './today';
import adMandatory from './ad-mandatory';
import adPause from './ad-pause';
import adCorner from './ad-corner';
import styles from './styles';

export default function removeAd(){
    adCorner();
    adPause();
    adMandatory();
    qrcode();
    today();
    styles();
}