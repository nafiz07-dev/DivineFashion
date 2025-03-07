import { controllCart, controllResponsiveSearch } from './frontend.js';
import * as vars from './vars.js';
import { viewCart } from './viewAllProduct.js';

controllResponsiveSearch();

// search logic
if (window.location.hash.slice(1) === 'search') {
  window.addEventListener('load', function () {
    this.document.querySelector('[data-shop-search]').focus();
  });
}

const shopSearchCard = document.querySelector('[data-shop-search]');
let products = [];

shopSearchCard.addEventListener('input', function (e) {
  const inputValue = e.target.value.toLowerCase();

  products.forEach((e) => {
    const isVisible =
      e.title.toLowerCase().includes(inputValue) ||
      e.priceDiscount.includes(inputValue) ||
      e.priceOriginal.includes(inputValue) ||
      e.size.toLowerCase().includes(inputValue);

    e.element.classList.toggle('hide', !isVisible);
  });
});

// fileters - price range
vars.applyPriceBtn.addEventListener('click', function () {
  // vars.shopFilterContent.classList.add('u-display-none')
  products.forEach((e) => {
    const inputValue = vars.priceMin.value;

    const isVisible =
      e.priceDiscount.includes(inputValue) ||
      e.priceOriginal.includes(inputValue);

    e.element.classList.toggle('hide', !isVisible);
  });
});

vars.applyFilterBtnSize.addEventListener('click', function () {
  // vars.shopFilterContent.classList.add('u-display-none')
  let checkedFiltersSize = [];
  vars.allShopCheckboxSize.forEach((e) => {
    if (e.checked) {
      checkedFiltersSize.push(e.value);
    }
  });
  const inputValue = String(checkedFiltersSize);
  //   console.log(inputValue);
  products.forEach((e) => {
    const isVisible =
      e.title.toUpperCase().includes(inputValue) ||
      String(e.size).includes(inputValue);

    e.element.classList.toggle('hide', !isVisible);
  });
});

vars.applyFilterBtnCategory.addEventListener('click', function () {
  // vars.shopFilterContent.classList.add('u-display-none')
  let checkedFiltersSize = [];
  vars.allShopCheckboxCategory.forEach((e) => {
    if (e.checked) {
      checkedFiltersSize.push(e.value);
    }
  });
  const inputValue = String(checkedFiltersSize).toLowerCase();
  products.forEach((e) => {
    const isVisible = e.title.toLowerCase().includes(inputValue);

    e.element.classList.toggle('hide', !isVisible);
  });
});

// checkedFilters.forEach((str) => {
//   products.forEach((e) => {
//     const isVisible = e.title.includes(str) || e.size.includes(str);

//     e.element.classList.toggle('hide', !isVisible);
//   });
// });

const viewShopProduct = async function () {
  const response = await fetch('/products.json');
  let data = await response.json();

  console.log(data);

  data.forEach((e) => {
    const card = vars.shopCardTemplete.content.cloneNode(true).children[0];
    const cardHref = card.querySelectorAll('[data-card-href]');
    const cardTitle = card.querySelector('[data-card-title]');
    const cardDiscountedPrice = card.querySelector(
      '[data-card-discounted-price]'
    );
    const cardOriginalPrice = card.querySelector('[data-card-original-price]');
    const cardNew = card.querySelector('[data-card-new]');
    const cardImage = card.querySelector('[data-card-image]');
    const cardAddToCart = card.querySelector('[data-add-to-cart]');
    const cardBuyNow = card.querySelector('[data-buy-now]');

    cardHref.forEach((el) => {
      el.setAttribute('href', `product.html#${e.id}`);
    });
    cardImage.src = `${e.productImage}`;
    cardNew.innerHTML = `${e.new ? 'new' : ''}`;
    cardDiscountedPrice.innerHTML = `৳${e.discountedPrice}`;
    cardOriginalPrice.innerHTML = `৳${e.originalPrice}`;
    cardTitle.innerHTML = `${e.title}`;
    cardAddToCart.dataset.hash = `${e.id}`;
    cardBuyNow.dataset.hash = `${e.id}`;
    vars.shopProductWarper.append(card);

    products.push({
      title: e.title,
      priceDiscount: e.discountedPrice,
      priceOriginal: e.originalPrice,
      size: String(e.size).slice(1, -1),
      element: card,
    });
  });
  const addToCartBtn = document.querySelectorAll('[data-add-to-cart]');
  addToCartBtn.forEach((e) => {
    e.addEventListener('click', function (e) {
      const clickedElimentId = e.target.dataset.hash;
      viewCart(clickedElimentId);
      console.log(vars.cartNotification);
      vars.cartNotification.classList.add('move-noti');
      setTimeout(() => {
        vars.cartNotification.classList.remove('move-noti');
      }, 2000);
    });
  });
  const buyNow = document.querySelectorAll('[data-buy-now]');
  buyNow.forEach((e) => {
    e.addEventListener('click', function (e) {
      const clickedElimentId = e.target.dataset.hash;
      window.location.href = `/shop/placeorder.html#${clickedElimentId}`;
    });
  });
};

viewShopProduct();
// vars.shopFilterArrow.style.display = 'none';

// if (window.innerWidth <= 600) {
//   vars.shopFilterArrow.style.display = 'block';
//   // vars.shopFilterContent.style.display = 'none';
//   vars.shopFilterContent.classList.add('u-display-none')

//   vars.shopFilterBtn.addEventListener('click', function () {
//     console.log('button clicked');
//     vars.shopFilterContent.classList.toggle('u-display-none')
//   })
// }

vars.shopFilterArrow.style.display = 'none';

if (window.innerWidth <= 600) {
  vars.shopFilterArrow.style.display = 'block';
  // vars.shopFilterContent.style.display = 'none';
  vars.shopFilterContent.classList.add('u-display-none');

  vars.shopFilterBtn.addEventListener('click', function () {
    console.log('button clicked');
    vars.shopFilterContent.classList.toggle('u-display-none');
  });
  vars.applyFilterBtnCategory.addEventListener('click', function () {
    vars.shopFilterContent.classList.add('u-display-none');
  });
  vars.applyFilterBtnSize.addEventListener('click', function () {
    vars.shopFilterContent.classList.add('u-display-none');
  });
  vars.applyPriceBtn.addEventListener('click', function () {
    vars.shopFilterContent.classList.add('u-display-none');
  });
}

controllCart();
viewCart();
