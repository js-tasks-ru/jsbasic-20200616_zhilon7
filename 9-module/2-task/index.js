import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides)
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem)

    this.ribbonMenu = new RibbonMenu(categories)
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem)

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    })
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem)

    this.cartIcon = new CartIcon()
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem)

    this.cart = new Cart(this.cartIcon)
    await fetch('products.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.data = data
        this.productsGrid = new ProductsGrid(data)
        document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem)
      })



    document.body.addEventListener('product-add', e => {
      this.data.forEach(product => {
        if (e.detail == product.id) {
          this.cart.addProduct(product)
        }
      })
    })

    this.stepSlider.elem.addEventListener('slider-change', e => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail // значение остроты из события 'slider-change'
      });

    })
    this.ribbonMenu.elem.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail // категория из события 'ribbon-select'
      });
    })

    document.querySelector('#nuts-checkbox').addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        noNuts: !e.detail
      });
    })

    document.querySelector('#vegeterian-checkbox').addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: !e.detail
      });

    }
    )






  }
}
