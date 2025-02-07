export const controllNav = function () {
  const hamberger = document.querySelector('.hamberger-continer');
  const navLinks = document.querySelector('.navbar__actions--navlinks');

  hamberger.addEventListener('click', function () {
    // console.log('clicked');
    navLinks.classList.toggle('move');
  });
};

export const controllResponsiveSearch = function () {
  const searchIcon = document.querySelector('.responsive-nav-search-icon');
  const searchBox = document.querySelector('.navbar__search');
  searchIcon.addEventListener('click', function () {
    searchBox.classList.toggle('display-block');
  });
};

// modalback -- login
// modal -- login page 

export const controllModals = function (button, close, modal, modalBack, hidden) {
  button.addEventListener('click', function () {
    modalBack.classList.toggle(`${hidden}`);
    modal.classList.toggle(`${hidden}`);
  });
  close.addEventListener('click', function () {
    modalBack.classList.toggle(`${hidden}`);
    modal.classList.toggle(`${hidden}`);
  });
  modalBack.addEventListener('click', function () {
    modalBack.classList.toggle(`${hidden}`);
    modal.classList.toggle(`${hidden}`);
  })
  // modal.addEventListener('click', function () {
  //   modal.classList.toggle(`${hidden}`);
  // })
}

export const controllCart = function () {
  const cartBtn = document.querySelector('.navbar__actions--buttons-cart');
  const cartModal = document.querySelector('.cart-warper');
  const cartClose = document.querySelector('.cart-top__cross');
  const cartModalBack = document.querySelector('.cart');

  cartBtn.addEventListener('click', function () {
    cartModalBack.classList.toggle('modal-hidden');
    cartModal.classList.toggle('move-cart');
    // cartWarper.classList.toggle('move-cart');
  });

  cartClose.addEventListener('click', function () {
    cartModal.classList.toggle('move-cart');
    cartModalBack.classList.toggle('modal-hidden');
    // cartWarper.classList.toggle('move-cart');
  });
  cartModalBack.addEventListener('click', function () {
    cartModal.classList.remove('move-cart');
    cartModalBack.classList.toggle('modal-hidden');
  })

};


