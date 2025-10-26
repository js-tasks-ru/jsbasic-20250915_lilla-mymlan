import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._elem = this.render();
  }
  
  render() {
    const categories = this.categories
    .map((cat) => 
    `<a href="#" class="ribbon__item" data-id="${cat.id}">${cat.name}</a>`
    )
    .join('');

    const div = createElement(`
      <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${categories}
      </nav>

      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `)
    
    this.onClickBtn(div);
    this.onScroll(div);
    this.onClickCategory(div);

    return div;
  }

  onClickBtn(div) {
    let ribbon = div;
    function arrowsLeftRight(event) {
      let ribbonInner = div.querySelector('.ribbon__inner');
      let arrowLeft = event.target.closest('.ribbon__arrow_left');
      let arrowRight = event.target.closest('.ribbon__arrow_right');

      if(arrowLeft) ribbonInner.scrollBy(-350,0);
      if(arrowRight) ribbonInner.scrollBy(350,0);
    }

    ribbon.addEventListener('click',arrowsLeftRight);

  }

  onScroll(div) {
    let ribbonInner = div.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('scroll',() => {
        let arrowLeft = div.querySelector('.ribbon__arrow_left');
        let arrowRight = div.querySelector('.ribbon__arrow_right');
        
        let scrollLeft = ribbonInner.scrollLeft;
        let scrollWidth = ribbonInner.scrollWidth;
        let scrollClient = ribbonInner.clientWidth;

        let scrollRight = scrollWidth - scrollClient - scrollLeft;

        (scrollLeft === 0) ? arrowLeft.classList.remove('ribbon__arrow_visible') : arrowLeft.classList.add('ribbon__arrow_visible');
        (scrollRight < 1) ? arrowRight.classList.remove('ribbon__arrow_visible') : arrowRight.classList.add('ribbon__arrow_visible');
      })
  }

  onClickCategory(div) {
    let ribbonInner = div.querySelector('.ribbon__inner');
    ribbonInner.addEventListener('click',(event) => {
      let item = event.target.closest('.ribbon__item');
      if(item) {
        event.preventDefault();
        let ribbons = ribbonInner.children;
        for (let ribbon of ribbons) {
          ribbon.classList.remove('ribbon__item_active');
        };
        item.classList.add('ribbon__item_active');
        let ribbonSelect = new CustomEvent("ribbon-select", {
        detail: item.dataset.id,
        bubbles: true
        });
        item.dispatchEvent(ribbonSelect);
        item.addEventListener('ribbon-select',() => {}) 
      }
    })
  }

  get elem() {
    return this._elem;
  }
}
