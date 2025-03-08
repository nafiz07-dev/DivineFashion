import * as vers from './vars.js';

// chatgpt viewCart function
let cartedProduct = JSON.parse(localStorage.getItem('cart')) || []; // Load existing cart

export const viewCart = async function (id) {
  const response = await fetch('/products.json');
  let data = await response.json();

  data.forEach((e) => {
    if (e.id === id) {
      // Check if the product is already in the cart
      const exists = cartedProduct.some((item) => item.id === id);
      if (!exists) {
        cartedProduct.push(e);
      }
    }
  });

  localStorage.setItem('cart', JSON.stringify(cartedProduct));

  const cartItems = JSON.parse(localStorage.getItem('cart'));
  vers.cartLenght.innerHTML = `${
    cartItems.length < 10 ? '0' + cartItems.length : cartItems.length
  }`;

  vers.cartSection.innerHTML = ''; // Clear cart UI before adding
  cartItems.forEach((e) => {
    const html = `<div class="cart-main__card" data-hash="${
      e.id
    }" data-selectedsize="${e.selectedSize}">

                <input
                  type="checkbox"
                  name="checkbox"
                  class="cart-main__card--checkbox"
                  data-checkbox
                />
    <a href="${`shop/product.html#${e.id}`}">
                <img
                  src="${e.productImage}"
                  alt="title"
                  class="cart-main__card--image"
                />
                 </a>
                <div class="cart-main__card--info">
                  <div class="info-warper">
                    <a href="${`shop/product.html#${e.id}`}" class="cart-main__card--info-title">
                      ${e.title}
                    </a>
                    <div>
                    <a href="${`shop/product.html#${e.id}`}" class="cart-main__card--info-stars">
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    </a>
                    </div>
                    <div>
                    <a href="${`shop/product.html#${e.id}`}" class="cart-main__card--info-actions-price-orginal"
                      ><s>৳${e.originalPrice}</s></a
                    >
                    </div>
                    <div class="cart-main__card--info-actions">
                    <div>
                      <a href="${`shop/product.html#${e.id}`}" class="cart-main__card--info-actions-price" data-cart-price>৳${
      e.discountedPrice
    }</a>
                      </div>
                      <div class="cart-main__card--info-actions-extra">
                      <div>  
                      <i class="fa-solid fa-trash cart-main__card--info-actions-extra-delete" data-trash-cart data-id="${
                        e.id
                      }"></i>
                        </div>
                        <div class="cart-main__card--info-actions-extra-quantity" data-quantity-box>
                          <div
                        class="cart-main__card--info-actions-extra-quantity--minus" data-quantity-minus data-id="${
                          e.id
                        }"
                      >
                        -
                      </div>
                      <div
                        class="cart-main__card--info-actions-extra-quantity--num" data-quantity
                      >
                        1
                      </div>
                      <div
                        class="cart-main__card--info-actions-extra-quantity--plus" data-quantity-plus data-id="${
                          e.id
                        }"
                      >
                        +
                      </div>

                        </div>

                        </div>
                  </div>
                </div>

              </div>`;
    vers.cartSection.insertAdjacentHTML('beforeend', html);
  });

  let placedOrders = [];
  let productPrice = [];
  vers.cartShippingFee.innerHTML = `৳${vers.deliveryCharge}`;

  const cartTrash = document.querySelectorAll('[data-trash-cart]');
  cartTrash.forEach((e) => {
    e.addEventListener('click', function () {
      const hash = e.dataset.id;
      const card = document.querySelector(`[data-hash="${hash}"`);
      card.innerHTML = '';
      const localCartData = JSON.parse(localStorage.getItem('cart'));
      // should get all objects.
      // on click I want to remove the object from localCartData
      let cartedData = [];
      localCartData.forEach((e) => {
        if (e.id !== hash) {
          cartedData.push(e);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cartedData));
    });
  });

  const quantityMinus = document.querySelectorAll('[data-quantity-minus]');
  const quantityPlus = document.querySelectorAll('[data-quantity-plus]');

  quantityPlus.forEach((e) => {
    e.addEventListener('click', function () {
      const hash = e.dataset.id;
      const card = document.querySelector(`[data-hash="${hash}"`);
      const quantity = card.querySelector('[data-quantity]');
      if (+quantity.innerHTML > 0) {
        quantity.innerHTML = +quantity.innerHTML + 1;
      }
    });
  });

  quantityMinus.forEach((e) => {
    e.addEventListener('click', function () {
      const hash = e.dataset.id;

      // I need to know the current id that is been clicked without the help of hash

      const card = document.querySelector(`[data-hash="${hash}"`);
      const quantity = card.querySelector('[data-quantity]');
      if (+quantity.innerHTML > 0) {
        quantity.innerHTML = +quantity.innerHTML - 1;
      }
    });
  });
  

  let totalAmounts;

  document.addEventListener('change', function (event) {
    if (event.target.matches('.cart-main__card--checkbox')) {
      const card = event.target.closest('.cart-main__card'); // Get parent card
      const productId = card.dataset.hash; // Get product ID from data-hash
      const productSelectedSize = card.dataset.selectedsize; // Get product size from data-selectedsize
      const currentProductPriceEl = card.querySelector('[data-cart-price]');
      const quantityData = card.querySelector('[data-quantity]');
      const currentProductPrice = +currentProductPriceEl.innerHTML.slice(1);
      const qunatity = +quantityData.innerHTML;

      if (event.target.checked) {
        const qunatity2 = +quantityData.innerHTML;
        placedOrders.push(`${productId}$${qunatity2}$${productSelectedSize}$`);
        card.style.backgroundColor = '#f1e9ff';
        productPrice.push(currentProductPrice * qunatity2);
        const totalPrice = productPrice.reduce((acc, cur) => acc + cur, 0);
        vers.cartProductPrice.innerHTML = `৳${totalPrice}`;
        vers.cartSubTotal.innerHTML = `৳${totalPrice + vers.deliveryCharge}`;
        totalAmounts = vers.cartSubTotal.innerHTML;
        vers.cartTotalItem.innerHTML = productPrice.length;

        console.log(placedOrders);
      } else {
        const qunatity3 = +quantityData.innerHTML;
        productPrice = productPrice.filter(
          (i) => i !== currentProductPrice * qunatity3
        );

        const totalPrice = productPrice.reduce((acc, cur) => acc + cur, 0);
        // console.log(productPrice, totalPrice);
        vers.cartProductPrice.innerHTML = `৳${totalPrice}`;
        vers.cartSubTotal.innerHTML = `৳${totalPrice + vers.deliveryCharge}`;
        totalAmounts = vers.cartSubTotal.innerHTML;
        vers.cartTotalItem.innerHTML = productPrice.length;
        card.style.backgroundColor = '';
      }
    }
  });
  vers.cartApplyBtn.addEventListener('click', function () {
    if (vers.cartCouponInput.value === vers.coupon) {
      const totalPrice = productPrice.reduce((acc, cur) => acc + cur, 0);
      const subTotal = totalPrice + vers.deliveryCharge;
      const discountAmount =
        subTotal - (subTotal / 100) * vers.couponDiscountPercentage;
      vers.cartSubTotal.innerHTML = `৳${discountAmount}`;
      totalAmounts = discountAmount;
      vers.cartTotalCostTxt.innerHTML = 'Total Cost (Coupon Applied)';
      // placedOrders.push(`${discountAmount}-${vers.couponDeliveryFree}`);
      placedOrders.push(
        `Discounted-Amount=${discountAmount}?Discount-Coupon=${vers.couponDeliveryFree}`
      );
    } else if (vers.cartCouponInput.value === vers.couponDeliveryFree) {
      const totalPrice = productPrice.reduce((acc, cur) => acc + cur, 0);
      const subTotal = totalPrice + vers.deliveryCharge;
      const discountAmount = subTotal - vers.deliveryCharge;
      vers.cartSubTotal.innerHTML = `৳${discountAmount}`;
      totalAmounts = discountAmount.innerHTML;
      vers.cartShippingFeeTxt.innerHTML = 'Shiping Fee (Free)';
      vers.cartShippingFee.innerHTML = `৳0`;
      placedOrders.push(
        `Discounted-Amount=${discountAmount}?Discount-Coupon=${vers.couponDeliveryFree}`
      );
    }
  });

  vers.cartProccedBtn.addEventListener('click', function () {
    if (placedOrders.length > 0) {
      placedOrders.push(`totalAmount=${totalAmounts.slice(1)}`);
      const hrefLink = placedOrders.join('%');
      vers.cartProccedBtnHref.setAttribute(
        'href',
        `/shop/placeorder.html#${hrefLink}`
      );
    }
  });

  // removing a item from the card is left
};

export const viewHomeProduct = async function () {
  const response = await fetch('products.json');
  let data = await response.json();

  data.forEach((e) => {
    const html = `
      <div data-product>
              <div class="product__card--1">
                <a href="${`shop/product.html#${e.id}`}" class="product__card--1-topInfo">${
      e.new ? 'new' : ''
    }</a>
                <a href="${`shop/product.html#${e.id}`}" class="product__card--1-imgBox">
                  <img
                    src="${e.productImage}"
                    alt="product"
                    class="product__card--1-imgBox-productIMG"
                  />
                </a>
                <a href="${`shop/product.html#${e.id}`}" class="product__card--1-information">
                  <div class="product__card--1-information-divider"></div>
                  <h3 class="product__card--1-information-title">
                    <span
                      class="product__card--1-information-title-border"
                    ></span>
                    ${e.title}
                  </h3>
                  <div class="product__card--1-information-stars">
                    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                  </div>
                  <div class="product__card--1-information-pricing">
                    <span class="product__card--1-information-pricing-price"
                      >৳${e.discountedPrice}</span
                    >
                    <span class="product__card--1-information-pricing-orgPrice"
                      ><s>৳${e.originalPrice}</s></span
                    >
                  </div>
                  </a>
                  <a class="product__card--1-information-buttons">
                    <button
                      class="product__card--1-information-buttons-addToCart"  data-add-to-cart data-hash="${
                        e.id
                      }"
                    >
                      Add to Cart
                    </button>
                    <button class="product__card--1-information-buttons-buyNow" data-buy-now data-hash="${
                      e.id
                    }">
                      Buy Now
                    </button>
                  </a>
              </div>
            </div>
      `;
    vers.homeProductSec.insertAdjacentHTML('beforeend', html);
  });

  const addToCart = document.querySelectorAll('[data-add-to-cart]');
  addToCart.forEach((e) => {
    e.addEventListener('click', function (e) {
      const clickedElimentId = e.target.dataset.hash;
      viewCart(clickedElimentId);
      vers.cartNotification.classList.add('move-noti');
      setTimeout(() => {
        vers.cartNotification.classList.remove('move-noti');
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
