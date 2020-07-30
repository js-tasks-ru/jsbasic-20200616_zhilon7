import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (this.checkingProperties(product.id)) {
      this.cartItems.forEach(item => {
        if (product == item.product) {
          item.count += 1
        }
      })
    } else {
      let newProduct = {}
      newProduct.product = product
      newProduct.count = 1
      this.cartItems.push(newProduct)
    }
    this.onProductUpdate(product);
  }

  updateProductCount(productId, amount) {
    let productToReturn;
    this.cartItems.forEach((item, index, array) => {
      if (productId == item.product.id) {
        item.count = item.count + amount;
        productToReturn = item
      }
      if (item.count == 0) {
        array.splice(index, 1)
      }
    })
    this.onProductUpdate(productToReturn);
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true

  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);

  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + current.count * current.product.price, 0);

  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price * count.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    let modal = this.modal

    for (let key of this.cartItems) {
      modal.setBody(this.renderProduct(key.product, key.count))
    }

    modal.setBody(this.renderOrderForm())
    modal.open()
    modal.elem.onclick = this.renderModalIventListner
    modal.setTitle('Your order');
    let form = document.forms[0];
    form.onsubmit = (event) => this.onSubmit(event);



  }
  renderModalIventListner = (e) => {
    if (e.target.closest('.cart-counter__button_plus')) {
      let id = e.target.closest('[data-product-id]').dataset.productId
      this.updateProductCount(id, 1)
    }

    if (e.target.closest('.cart-counter__button_minus')) {
      let id = e.target.closest('[data-product-id]').dataset.productId
      this.updateProductCount(id, -1)
    }



  }
  onProductUpdate(product) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = product.product.id,
        modalBody = this.modal.elem,
        productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`),
        productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`),
        infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      let count = product.count;

      productCount.innerHTML = count;
      productPrice.innerHTML = `€${(product.product.price * product.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      let cartProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);
      if (this.isEmpty()) {
        this.modal.close()
      }
    }
  }

  onSubmit(event) {
    event.preventDefault()
    let form = document.forms[0];
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
    this.modal.setTitle('Success!')
    this.cartItems.splice(0)
    document.querySelector('.modal__body').innerHTML = ''
    this.modal.setBody(createElement(`
    <div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>
    `))
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
  checkingProperties(id) {
    return this.cartItems.find((item) => id == item.product.id)


  }
}


