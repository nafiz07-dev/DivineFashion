/*
on load, I'll take the hash that will contain the id, fetch it form the json file, and disiplay them on the product section. 

on place click I'll send email through emailJS
*/

import * as vers from './vars.js';

const hash = window.location.hash.slice(1);
const hashArr = hash.split('%');

const loadProduct = hashArr.slice(0, -1);
const discountAndAmount = hashArr.slice(-2)[0];
// const discountAndAmount = hashArr.slice(-2)[0];

console.log(hash);
const totalAmnt = hashArr.at(-1);
let totalAmount = totalAmnt.split('=')[1];
// console.log(totalAmount);
if (window.location.hash.includes('discount')) {
  const discountAmount = discountAndAmount.split('?')[0].split('=')[1];
  const discountCoupon = discountAndAmount.split('?')[1].split('=')[1];
}
// console.log(discountCoupon);

// console.log(String(loadProduct).split('$'));

const proudctAndQantity = String(loadProduct).split('$');

// const loadProductArr = proudctAndQantity.filter((i) => i !== '1' && i !== '');
const loadProductArr = proudctAndQantity.filter((i) => isNaN(i) && i !== '');
// console.log(loadProductArr);

// I get the size now I had to put it in in the url. The size varable will come from product page where it will be set in the local storage, and in the url the size will get printed out.
let availableSize = ['XXL', 'XXXL', 'XL', 'M', 'L', 'S'];
const loadProductSize = proudctAndQantity.filter((i) =>
  availableSize.includes(i)
);
// console.log(loadProductSize);

// const loadQantity = proudctAndQantity.filter((i) => i === '1');
const loadQantity = proudctAndQantity.filter((i) => !isNaN(i));

// console.log(loadQantity);

// console.log(String(loadProductArr).split(',').slice(0, -1));

const loadProductArrFnl = String(loadProductArr).split(',').slice(0, -1);
// const loadProductArrFnl = String(loadProductArr).split(',,').slice(0, -1);

// I need to specify the size also, damn

console.log(loadProductArrFnl);
const loadProductArrFnl2 = String(loadProductArrFnl).split(',');

const loadProductArrFnl4 = loadProductArrFnl2.filter(
  (i) => !availableSize.includes(i)
);
const loadProductArrFnl3 = loadProductArrFnl4.filter(
  (i, index) => loadProductArrFnl4.indexOf(i) === index
);

console.log(loadProductArrFnl3);
// here if there is 2 item are same I want them to be one and want that array to be loadProductArrFnl3;

console.log(loadProductArrFnl3);

const nowDate = new Date();

const local = navigator.language;

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const dateIntl = new Intl.DateTimeFormat(local, options).format(nowDate);

const withDate = [...loadProductArrFnl3, dateIntl, loadQantity];

let count = 6;

let discountApliedInOrderPage = [];

const sendOrder = function () {
  let parms = {
    product_id: String(loadProductArrFnl3),
    product_quantity: String(loadQantity),
    product_size: String(loadProductSize),
    discount_coupon: window.location.hash.includes('discount')
      ? discountCoupon
      : '',
    discounted_amount: window.location.hash.includes('discount')
      ? discountAmount
      : '',
    total_amount: totalAmount,
    discount_applied_in_order_page: discountApliedInOrderPage,
    customer_name: vers.placeOrderName.value,
    customer_address: vers.placeOrderAddress.value,
    customer_phone: vers.placeOrderPhone.value,
    ordered_time: dateIntl,
  };

  emailjs
    .send('service_0baqgu5', 'template_g88g3c7', parms)
    .then((res) => {
      vers.placeOrderSuccess.classList.toggle('display-none');
      vers.orderLoader.style.display = 'none';
      const countdown = setInterval(() => {
        count--;
        vers.placeOrderSuccessCounter.textContent = count;

        if (count === 0) {
          clearInterval(countdown);
          window.location.href = '/index.html'; // Replace with your target page
        }
      }, 1000);
    })
    .catch((err) => {
      vers.placeOrderFail.classList.toggle('display-none');
      const countdown = setInterval(() => {
        count--;
        vers.placeOrderFailCounter.textContent = count;

        if (count === 0) {
          clearInterval(countdown);
          vers.placeOrderFail.classList.remove('display-none');
        }
      }, 1000);
    });
};

// Load the products on top

let singleProductPrice;

const loadOrderedProduct = async function () {
  const response = await fetch('/products.json');
  let data = await response.json();
  console.log(data);

  let filterOrderedProduct = [];

  //   loadProduct.forEach((el) => {
  data.forEach((e) => {
    if (
      hash.includes('discount') ||
      hash.includes('totalAmount') ||
      hash.includes('%') ||
      hash.includes('$')
    ) {
      loadProductArrFnl3.forEach((el) => {
        if (e.id === el) {
          filterOrderedProduct.push(e);
        }
      });
    } else {
      if (e.id === hash) {
        filterOrderedProduct.push(e);
      }
    }
  });
  //   });

  console.log(filterOrderedProduct);

  filterOrderedProduct.forEach((e, index) => {
    const card =
      vers.orderProductCardTemplete.content.cloneNode(true).children[0];
    const cardImage = card.querySelector('[data-order-product-image]');
    const CardTitle = card.querySelector('[data-order-product-title]');
    const cardPrice = card.querySelector('[data-order-product-price]');
    const cardQunatity = card.querySelector('[data-order-product-quantity]');

    card.setAttribute('href', `product.html#${e.id}`);
    cardImage.src = `${e.productImage}`;
    CardTitle.innerHTML = `${e.title}`;
    cardPrice.innerHTML = `৳${e.discountedPrice}`;
    // loadQantity.forEach((el) => {
    cardQunatity.textContent = loadQantity[index];
    // console.log(cardQunatity.textContent);
    // });

    vers.orderProductContiner.append(card);

    if (
      !hash.includes('discount') ||
      !hash.includes('totalAmount') ||
      !hash.includes('%') ||
      !hash.includes('$')
    ) {
      singleProductPrice = e.discountedPrice;
    }

    // append the datas
  });

  if (window.location.hash.includes('discount')) {
    if (discountAmount && totalAmnt !== 'undefined') {
      vers.orderAmount.innerHTML = `৳${discountAmount}`;
      vers.orderCouponBox.style.display = 'none';
      console.log(discountAmount);
      console.log('discounted amount should display');
    }
  }

  if (totalAmnt) {
    console.log('total amount should display');
    vers.orderAmount.innerHTML = `৳${totalAmount}`;
    console.log(totalAmnt, totalAmount);
  }

  if (
    !hash.includes('discount') ||
    !hash.includes('totalAmount') ||
    !hash.includes('%') ||
    !hash.includes('$')
  ) {
    vers.orderAmount.innerHTML = `৳${Number(singleProductPrice) + vers.deliveryCharge}`;

  }
    // on coupon apply I want to replace the total amount with the coupon amount and take that coupon amount to send the request to the email.
    // I can set the couponed money to let variable and then send it to the email from the top
    vers.orderCouponBtn.addEventListener('click', function () {
      // I need the current total amount.
      vers.orderCouponText.style.color = 'gray';

      const orderedAmount = Number(vers.orderAmount.innerHTML.slice(1));
      const coupon = vers.orderCouponInput.value;

      if (coupon === vers.coupon) {
        vers.orderCouponText.innerHTML = `(${coupon} Applied)`;
        // const totalPrice = productPrice.reduce((acc, cur) => acc + cur, 0);
        // const subTotal = totalPrice + vers.deliveryCharge;
        const discountAmount =
          orderedAmount - (orderedAmount / 100) * vers.couponDiscountPercentage;
        vers.orderAmount.innerHTML = `৳${discountAmount}`;
        totalAmount = discountAmount;
        discountApliedInOrderPage.push(discountAmount);
        discountApliedInOrderPage.push(coupon);
        // vers.cartTotalCostTxt.innerHTML = 'Total Cost (Coupon Applied)';
        // placedOrders.push(`${discountAmount}-${vers.couponDeliveryFree}`);
        // placedOrders.push(
        //   `Discounted-Amount=${discountAmount}?Discount-Coupon=${vers.couponDeliveryFree}`
        // );
      } else if (coupon === vers.couponDeliveryFree) {
        vers.orderCouponText.innerHTML = `(${coupon} Applied)`;
        const discountAmount = orderedAmount - vers.deliveryCharge;
        vers.orderAmount.innerHTML = `৳${discountAmount}`;
        totalAmount = discountAmount;
        discountApliedInOrderPage.push(discountAmount);
        discountApliedInOrderPage.push(coupon);
      }
    });

  // now on place order email on the gmail with the product details and amount and quantity

  // on place order I want to set all the ordered id to the local storage as orders and then load them on my order and returns I'll also set the time.

  vers.placeOrder.addEventListener('click', function () {
    if (
      vers.placeOrderAddress.value === '' &&
      vers.placeOrderPhone.value === '' &&
      vers.placeOrderName.value === ''
    ) {
      vers.placeOrderError.classList.toggle('display-none');
      // console.log(vers.placeOrderAddress.value === '' && vers.placeOrderPhone.value === '' && vers.placeOrderName.value === '');
      // console.log();
      console.log('order didnt placed due to errro');
    } else {
      sendOrder();
      localStorage.setItem('orders', JSON.stringify(withDate));
      vers.orderProductContiner.innerHTML = '';
      vers.orderDisplayNone.forEach((e) => {
        e.style.display = 'none';
      });
      vers.orderDivideNone.forEach((e) => {
        e.classList.add('display-none');
      });
      vers.orderCouponBox.style.display = 'none';
      vers.orderLoader.classList.remove('display-none');

      console.log('order placed');
    }
  });
};

loadOrderedProduct();
