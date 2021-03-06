export default function() {
    let styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    let styleSheet = styleEl.sheet;
    [
        '.adcontainer',
        '.mtg-client_left',
        '.mtg-client_right',
        '.a-card-item',
    ].forEach(selector => {
        styleSheet.insertRule(`${selector}{display:none!important;}`);
    });
}
