// the only thing left is to display the ordered products. and setup cart and link throughout all the pages

import { controllCart } from './frontend.js';
import { redirectToShop } from './search.js';
import * as vers from './vars.js';
import { viewCart } from './viewAllProduct.js';

controllCart();
viewCart();
redirectToShop();

const orderData = JSON.parse(localStorage.getItem('orders'));

const orderProductData = orderData.slice(0, -2);
const orderDateOf = orderData.slice(-2)[0];
const orderQunatity = orderData.slice(-2)[1];


const displayOrderCard = async function () {
  const response = await fetch('/products.json');
  let data = await response.json();

  let dataOrdered = [];
  data.forEach((e, i) => {
    if (orderProductData.includes(e.id)) {
      dataOrdered.push(e);
    }
  });
    
  vers.orderPageDate.innerHTML = '';
  vers.orderPageDate.innerHTML = orderDateOf;

  dataOrdered.forEach((e, i) => {
    const card = vers.orderPageTempleteCard.content.cloneNode(true).children[0];
    const cardImage = card.querySelector('[data-order-image]');
    const cardTitle = card.querySelector('[data-order-title]');
    const cardOrgPrice = card.querySelector('[data-order-org-price]');
    const cardDisPric = card.querySelector('[data-order-dis-price]');
    const cardQunatity = card.querySelector('[data-order-quantity]');

    cardImage.src = e.productImage;
    cardTitle.innerHTML = e.title;
    cardOrgPrice.innerHTML = e.originalPrice;
    cardDisPric.innerHTML = e.discountedPrice;
    cardQunatity.innerHTML = orderQunatity[i];
    card.setAttribute('href', `product.html#${e.id}`);

    vers.orderPageProductSection.append(card);
  });
};

displayOrderCard();
