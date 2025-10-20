import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._elem = this.render();
  }

  render() {
    const div = createElement(`
    <div id="holder" class="container_half">
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${Number(this.product.price).toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    </div>  
  `)

  this.onClick(div);

  return div;
  }

  onClick(div) {
    let btn1 = div.querySelector('.card__button');
    btn1.addEventListener('click', () => {
      let productAdd = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
      });
      btn1.dispatchEvent(productAdd);
    })

    btn1.addEventListener('product-add',() => {}) 
  }

  get elem() {
    return this._elem;
  }
}