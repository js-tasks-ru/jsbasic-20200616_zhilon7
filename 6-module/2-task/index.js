import createElement from '/assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.elem.innerHTML = `
        <div class="card">
          <div class="card__top">
            <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
            <span class="card__price">€${product.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
            <div class="card__title">${product.name}</div>
            <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    this.elem.addEventListener('click', function (e) {
      e.target.dispatchEvent(new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: product.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      }))
    })
    this.customEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: product.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    })
  }

}

