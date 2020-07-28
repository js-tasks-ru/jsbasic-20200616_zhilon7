export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    this.cartItems.forEach((item, index, array) => {
      if (productId == item.product.id) {
        item.count = item.count + amount;
      }
      if (item.count == 0) {
        array.splice(index, 1)
      }
    })
    this.onProductUpdate(productId);
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

  onProductUpdate() {
    this.cartIcon.update(this);
  }

  checkingProperties(id) {
    return this.cartItems.find((item) => id == item.product.id)


  }
}

