/*
when clicked search in the home, it will redirect the user to shop page, where the cursor will be focused to search bar, then the data will load and it will be searched using dynamic method I know. 
*/

import * as vars from './vars.js';

export const redirectToShop = function () {
  vars.searchSection.addEventListener('click', function () {
    vars.searchSection.setAttribute('href', '/shop/shop.html#search');
  });
};

// export const shopInputFocus = function () {
//   if (window.location.hash.slice(1) === 'search') {
//     const shopSearch = document.querySelector('[data-shop-search]');
//     shopSearch.focus();
//   }
// };
