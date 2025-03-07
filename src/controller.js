import * as frontend from './frontend.js';
import * as vars from './vars.js';
import * as model from './model.js';
import * as viewAllProduct from './viewAllProduct.js';
import * as search from './search.js';

// frontend code;
// modal and nav open close logic;
frontend.controllNav();
frontend.controllResponsiveSearch();
frontend.controllCart();
// frontend.controllModals(
//   vars.logInBtn,
//   vars.logInClose,
//   vars.logInModal,
//   vars.logInModalBack,
//   'modal-hidden'
// );
// frontend.controllModals(
//   vars.signUpBtn,
//   vars.signUpClose,
//   vars.signUpModal,
//   vars.signUpModalBack,
//   'modal-hidden'
// );

// cart logistics
viewAllProduct.viewHomeProduct();
viewAllProduct.viewCart();

// search logic
search.redirectToShop();
// search.shopInputFocus();
