import * as vers from './vars.js';

const hash = window.location.hash.slice(1);
const hashArr = hash.split('%');

const discountAndAmount = hashArr.slice(-2)[0];

// console.log(hash);

const loadProduct =
  !hash.includes('discount') ||
  !hash.includes('totalAmount') ||
  !hash.includes('%') ||
  !hash.includes('$')
    ? hashArr
    : hashArr.slice(0, -1);


const totalAmnt = hashArr.at(-1);
let totalAmount = totalAmnt.split('=')[1];
if (window.location.hash.includes('discount')) {
  const discountAmount = discountAndAmount.split('?')[0].split('=')[1];
  const discountCoupon = discountAndAmount.split('?')[1].split('=')[1];
}

const proudctAndQantity = String(loadProduct).split('$');

const loadProductArr = proudctAndQantity.filter((i) => isNaN(i) && i !== '');

let availableSize = ['XXL', 'XXXL', 'XL', 'M', 'L', 'S'];
const loadProductSize = proudctAndQantity.filter((i) =>
  availableSize.includes(i)
);


const loadQantity = proudctAndQantity.filter((i) => !isNaN(i));

// const loadProductArrFnl = String(loadProductArr).split(',').slice(0, -1);

const loadProductArrFnl =
  !hash.includes('discount') ||
  !hash.includes('totalAmount') ||
  !hash.includes('%') ||
  !hash.includes('$')
    ? loadProductArr
    : String(loadProductArr).split(',').slice(0, -1);

// const loadProductArrFnl2 = String(loadProductArrFnl).split(',');

const loadProductArrFnl2 =
  !hash.includes('discount') ||
  !hash.includes('totalAmount') ||
  !hash.includes('%') ||
  !hash.includes('$')
    ? loadProductArr
    : String(loadProductArrFnl).split(',');

const loadProductArrFnl4 = loadProductArrFnl2.filter(
  (i) => !availableSize.includes(i)
);


const loadProductArrFnl3 = loadProductArrFnl4.filter(
  (i, index) => loadProductArrFnl4.indexOf(i) === index
);

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

let singleorderSend = [];


const sendOrder = function () {
  let parms = {
    product_id: String(loadProductArrFnl3),
    product_quantity:
      loadQantity.length > 0 ? String(loadQantity) : '1 (Default)',
    product_size:
      loadProductSize.length > 0 ? String(loadProductSize) : 'XL (Default)',
    discount_coupon: window.location.hash.includes('discount')
      ? discountCoupon
      : 'Not Applied',
    discounted_amount: window.location.hash.includes('discount')
      ? discountAmount
      : 'Not applied',
    total_amount: totalAmount
      ? totalAmount
      : 'Default Price + delivery charge (Default)',
    discount_applied_in_order_page: (discountApliedInOrderPage.length > 0)
      ? discountApliedInOrderPage
      : 'Not Applied',
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

  let filterOrderedProduct = [];

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
    cardQunatity.textContent = loadQantity[index];

    vers.orderProductContiner.append(card);

    if (
      !hash.includes('discount') ||
      !hash.includes('totalAmount') ||
      !hash.includes('%') ||
      !hash.includes('$')
    ) {
      singleProductPrice = e.discountedPrice;
    }
  });

  if (window.location.hash.includes('discount')) {
    if (discountAmount && totalAmnt !== 'undefined') {
      vers.orderAmount.innerHTML = `৳${discountAmount}`;
      vers.orderCouponBox.style.display = 'none';
    }
  }

  if (totalAmnt) {
    vers.orderAmount.innerHTML = `৳${totalAmount}`;
  }


  if (
    !hash.includes('discount') ||
    !hash.includes('totalAmount') ||
    !hash.includes('%') ||
    !hash.includes('$')
  ) {
    vers.orderAmount.innerHTML = `৳${
      Number(singleProductPrice) + vers.deliveryCharge
    }`;
    singleorderSend.push(vers.orderAmount.innerHTML);
  }
  vers.orderCouponBtn.addEventListener('click', function () {
    vers.orderCouponText.style.color = 'gray';

    const orderedAmount = Number(vers.orderAmount.innerHTML.slice(1));
    const coupon = vers.orderCouponInput.value;

    if (coupon === vers.coupon) {
      vers.orderCouponText.innerHTML = `(${coupon} Applied)`;
      const discountAmount =
        orderedAmount - (orderedAmount / 100) * vers.couponDiscountPercentage;
      vers.orderAmount.innerHTML = `৳${discountAmount}`;
      totalAmount = discountAmount;
      discountApliedInOrderPage.push(discountAmount);
      discountApliedInOrderPage.push(coupon);
    } else if (coupon === vers.couponDeliveryFree) {
      vers.orderCouponText.innerHTML = `(${coupon} Applied)`;
      const discountAmount = orderedAmount - vers.deliveryCharge;
      vers.orderAmount.innerHTML = `৳${discountAmount}`;
      totalAmount = discountAmount;
      discountApliedInOrderPage.push(discountAmount);
      discountApliedInOrderPage.push(coupon);
    }
  });

  vers.placeOrder.addEventListener('click', function () {
    if (
      vers.placeOrderAddress.value === '' &&
      vers.placeOrderPhone.value === '' &&
      vers.placeOrderName.value === ''
    ) {
      vers.placeOrderError.classList.toggle('display-none');
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
    }
  });
};

loadOrderedProduct();

