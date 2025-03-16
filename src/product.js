import { controllCart } from './frontend.js';
import { redirectToShop } from './search.js';
import * as vers from './vars.js';
import { viewCart } from './viewAllProduct.js';

redirectToShop();

const productPageTitle = document.querySelector('[data-product-page-title]');
const breadcramp = document.querySelector('[data-breadcramp]');
const mainPhoto = document.querySelector('[data-main-photo]');
const subPhotoSection = document.querySelector('[data-sub-photo-section]');
const productTitle = document.querySelector('[data-product-title]');
const productOrgPrice = document.querySelector('[data-product-orginal-price]');
const productDisPrice = document.querySelector(
  '[data-product-discounted-price]'
);
const productDiscirption = document.querySelector('[data-product-discription]');
const selectSection = document.querySelector('[data-product-select-section]');
const productSuggestionSection = document.querySelector(
  '[data-product-suggestion]'
);

const viewProduct = async function () {
  const response = await fetch('/products.json');
  let data = await response.json();
  const productId = window.location.hash.slice(1);
  const cardProduct = document.querySelector('[data-add-to-cart]');
  cardProduct.dataset.hash = productId;

  let currentId = [];
  data.forEach((e) => {
    if (productId === e.id) {
      currentId = e;
    }
  });

  subPhotoSection.innerHTML = '';
  currentId.productSubImage.forEach((e) => {
    const html = `
                <img
                  src="${e}"
                  alt="product"
                  class="product-side1__photo--sub-photos"
                  data-product-sub-image
                />
        `;
    subPhotoSection.insertAdjacentHTML('beforeend', html);
  });
  const subPhoto = document.querySelectorAll('[data-product-sub-image]');

  subPhoto.forEach((e) => {
    e.classList.remove('sub-photo-active');
    e.addEventListener('click', function () {
      const src = e.getAttribute('src');
      mainPhoto.setAttribute('src', `${src}`);
      e.classList.add('sub-photo-active');
    });
  });

  currentId.size.forEach((e) => {
    const html = `
                <option value="${e}">${e}</option>
        `;
    selectSection.insertAdjacentHTML('beforeend', html);
  });
  productPageTitle.innerHTML = currentId.title;
  breadcramp.innerHTML =
    +currentId.title.length <= 30
      ? currentId.title
      : currentId.title.slice(0, -(currentId.title.length - 30)) + '...';
  productTitle.innerHTML = currentId.title;
  mainPhoto.setAttribute('src', `${currentId.productImage}`);
  productDiscirption.innerHTML = currentId.discription;
  productOrgPrice.innerHTML = currentId.originalPrice;
  productDisPrice.innerHTML = currentId.discountedPrice;


  data.forEach((e) => {
    if (productId !== e.id) {
      const html = `
        <a href="${`product.html#${e.id}`}" class="product-rest__suggestions--card">
                <img
                  src="${e.productImage}"
                  alt="suggestion"
                  class="product-rest__suggestions--card-img"
                />
                <div class="product-rest__suggestions--card-title">
                  ${e.title} 
                </div>
                <div class="product-rest__suggestions--card-prices">
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  <div class="product-rest__suggestions--card-prices-original">
                    <s>৳${e.originalPrice}</s>
                  </div>
                  <div
                    class="product-rest__suggestions--card-prices-discounted"
                  >
                    ৳${e.discountedPrice}
                  </div>
                </div>
              </a>
        `;
      productSuggestionSection.innerHTML = '';
      productSuggestionSection.insertAdjacentHTML('beforeend', html);
    }
  });
};

window.addEventListener('hashchange', viewProduct);
window.addEventListener('load', viewProduct);

vers.productAddToCart.addEventListener('click', function () {
  const cartData = JSON.parse(localStorage.getItem('cart'));
  const cartHash = window.location.hash.slice(1);

  // find the current added to cart data:
  let currentData = [];
  let otherCartData = [];

  cartData.forEach((e) => {
    if (e.id === cartHash) {
      currentData.push(e);
    }
    if (e.id !== cartHash) {
      otherCartData.push(e);
    }
  });
  // now set new value to the currentData of the size;
  // get the selected data text;

  const selectedSize =
    selectSection.options[selectSection.selectedIndex].innerHTML;
  // console.log(selectedSize);
  // push the size into the current data array.
  console.log(currentData);
  if (currentData.length >= 1) {
    currentData[0].selectedSize = selectedSize;
  }


  const allCartData = [...currentData, ...otherCartData];
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(allCartData));

  // all set, but now I need to send the size along with the place order text.
});

controllCart();

const addToCart = document.querySelector('[data-product-add-to-cart]');
addToCart.addEventListener('click', function (e) {
  const clickedElimentId = window.location.hash.slice(1);
  viewCart(clickedElimentId);
  vers.cartNotification.classList.add('move-noti');
  setTimeout(() => {
    vers.cartNotification.classList.remove('move-noti');
  }, 2000);
});


const buyNow = document.querySelector('[data-product-buy-now]');
buyNow.addEventListener('click', function () {
  window.location.href = `/shop/placeorder.html#${window.location.hash.slice(1)}`
});
