 - I need to push this site to production level, I'm gonna do it by today: 3/3/2025;

 - Feature's I need to add: 
    - make json product data and load them dynamically on proudct and new arrivals. 
    - use window.hash to load full page; 
        - Make sub-photo clickable. 
        - Make skeliton loader for product page if possible. 
        - product is not that much so hid the filters for now. 
    - make the search bar work on the home page, and in store. 
    - make add to cart logic and buy logic, redirect all orders on a gmail. 
    - hide the things that is nott needed. 
        - comment and suggestion bar, hide them.

// now where should I start: 
 - Loading the data dynamically using json;
    - How should I set this up? 
    - first fetch json file on the model.js make a view file and and display them on home and store using controller. 
 - On product click: 
    - take the id, 
    - set the href to product and load the product page with the data, and the set the top with the hash id, 
    - on link pest, take the hash, find the hash data and load the product page. 


`<div class="cart-main__card" data-hash="${e.id}">
                <input
                  type="checkbox"
                  name="checkbox"
                  class="cart-main__card--checkbox"
                  data-checkbox
                />
    
                <img
                  src="${e.productImage}"
                  alt="title"
                  class="cart-main__card--image"
                />
                <div class="cart-main__card--info">
                  <div class="info-warper">
                    <div class="cart-main__card--info-title">
                      ${e.title}
                    </div>
                    <div class="cart-main__card--info-stars">
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    </div>
                    <span class="cart-main__card--info-actions-price-orginal"
                      ><s>৳${e.originalPrice}</s></span
                    >
                    <div class="cart-main__card--info-actions">
                      <div class="cart-main__card--info-actions-price" data-cart-price>৳${e.discountedPrice}</div>
                      <div class="cart-main__card--info-actions-extra">
                        <i class="fa-solid fa-trash cart-main__card--info-actions-extra-delete"></i>
                        <div class="cart-main__card--info-actions-extra-quantity">
                          <div class="cart-main__card--info-actions-extra-quantity--minus">-</div>
                          <div class="cart-main__card--info-actions-extra-quantity--num">01</div>
                          <div class="cart-main__card--info-actions-extra-quantity--plus">+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;





              `<div class="cart-main__card" data-hash="${e.id}">

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
                <a href="${`shop/product.html#${e.id}`}" class="cart-main__card--info">
                  <div class="info-warper">
                    <div class="cart-main__card--info-title">
                      ${e.title}
                    </div>
                    <div class="cart-main__card--info-stars">
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                      <i class="fa-solid fa-star" style="color: #ffd43b"></i>
                    </div>
                    <span class="cart-main__card--info-actions-price-orginal"
                      ><s>৳${e.originalPrice}</s></span
                    >
                    <div class="cart-main__card--info-actions">
                      <div class="cart-main__card--info-actions-price" data-cart-price>৳${
                        e.discountedPrice
                      }</div>
                      <div class="cart-main__card--info-actions-extra">
                        <i class="fa-solid fa-trash cart-main__card--info-actions-extra-delete"></i>
                        <div class="cart-main__card--info-actions-extra-quantity">
                          <div class="cart-main__card--info-actions-extra-quantity--minus">-</div>
                          <div class="cart-main__card--info-actions-extra-quantity--num">01</div>
                          <div class="cart-main__card--info-actions-extra-quantity--plus">+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

              </div>`;