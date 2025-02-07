import * as frontend from "./frontend";
import * as vars from "./vars";

// import * as var from "./variables";

// const controllNav = function () {
//     document.querySelector('.navbar__actions--navlinks').addEventListener('click', function () {
//         console.log('clicked');
//     })
// }
frontend.controllNav();
frontend.controllResponsiveSearch();
// frontend.controllCartBack();
frontend.controllCart();
frontend.controllModals(vars.logInBtn, vars.logInClose, vars.logInModal, vars.logInModalBack, 'modal-hidden' );
frontend.controllModals(vars.signUpBtn, vars.signUpClose, vars.signUpModal, vars.signUpModalBack, 'modal-hidden' );