
import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';


export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render()

  }
  render() {
    this.elem = createElement(`
      <div class="products-grid">
    <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
    </div>
  </div>`)
    this.addItemCards(this.products)

  }
  addItemCards(prod) {
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    prod.map(item => {
      let card = new ProductCard(item)
      productsGridInner.append(card.elem)
    })
  }
  updateFilter(filters) {
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = ''

    Object.assign(this.filters, filters);
    this.filterSoups = this.products.filter(item => this.filters.noNuts != item.nuts || !this.filters.noNuts)
      .filter(item => ((this.filters.vegeterianOnly || this.filters.vegetarian) && item.vegeterian) || !this.filters.vegeterianOnly)
      .filter(item => this.filters.maxSpiciness >= item.spiciness || !this.filters.maxSpiciness)
      .filter(item => this.filters.category === item.category || !this.filters.category);
    if (this.filterSoups) {
      this.addItemCards(this.filterSoups);
    }
  }

}

