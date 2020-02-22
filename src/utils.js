/**
 * get a vue instance from selector
 * @param selector
 * @return {any | null}
 */
export function getVueInstance(selector) {
  return detectElement(selector).then(dom => dom.__vue__);
}

/**
 * resolve once a element is on the page
 * @param selector
 * @param interval
 * @param retry
 * @return {Promise<any>}
 */
export function detectElement(selector, interval = 500, retry = 10) {
  return new Promise((resolve, reject) => {
    setTimeout(function detect() {
      let dom = document.querySelector(selector);
      if (dom) {
        resolve(dom);
      } else if (retry > 0) {
        setTimeout(detect, interval);
        retry -= 1;
      } else {
        reject(`can not found ${selector} on the page`);
      }
    }, interval);
  });
}
