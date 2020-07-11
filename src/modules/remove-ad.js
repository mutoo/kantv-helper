import qrcode from './modules/qrcode';
import today from './modules/today';
import adMandatory from './modules/ad-mandatory';
import adPause from './modules/ad-pause';
import adCorner from './modules/ad-corner';
import styles from './modules/styles';

export default function removeAd(){
    adCorner();
    adPause();
    adMandatory();
    qrcode();
    today();
    styles();
}