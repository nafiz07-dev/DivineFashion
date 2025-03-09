import * as vars from './vars.js';

export const redirectToShop = function () {
  vars.searchSection.addEventListener('click', function () {
    vars.searchSection.setAttribute('href', '/shop/shop.html#search');
  });
};
