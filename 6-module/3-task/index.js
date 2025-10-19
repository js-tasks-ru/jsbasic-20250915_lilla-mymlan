import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._elem = this.render();
  }

  render() {
    const slide = this.slides
    .map((s) => 
      `<div class="carousel__slide" data-id="${s.id}">
        <img src="/assets/images/carousel/${s.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${Number(s.price).toFixed(2)}</span>
          <div class="carousel__title">${s.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `
    )
    .join('')

    const div = createElement(`
  <div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
      ${slide}
    </div>
  </div>
    `)
  
  this.onClick(div);
  this.initCarousel(div);

  return div;
  }

  onClick(div) {
    let carouselInner = div.querySelector('.carousel__inner');
    carouselInner.addEventListener('click', ({target}) => {
      let btn = target.closest('.carousel__button');
      if(btn) {
        let productAdd = new CustomEvent("product-add", {
        detail: btn.closest('.carousel__slide').dataset.id,
        bubbles: true
        });
        btn.dispatchEvent(productAdd);
        btn.addEventListener('product-add',() => {}) 
      }
    })
    }

  initCarousel(div) {
    let cntSlides = this.slides.length - 1;
    let carousel = div;//.querySelector('.carousel');
    let arrowLeft = div.querySelector('.carousel__arrow_left');
    arrowLeft.style.display = 'none';
    function arrowsLeftRight (event) {
      let carouselInner = div.querySelector('.carousel__inner');
      const carouselInnerWidth = carouselInner.offsetWidth; //- почему-то не возвращает значение
      let arrowRight = event.target.closest('.carousel__arrow_right');
      let arrowLeft = event.target.closest('.carousel__arrow_left');
      let transform = (!carouselInner.style.transform) ? 0 : parseInt(carouselInner.style.transform.slice(11));
    
      if(arrowLeft) carouselInner.style.transform = `translateX(${transform + carouselInnerWidth}px)`;
    
      if(arrowRight) carouselInner.style.transform = `translateX(${transform - carouselInnerWidth}px)`;
      
      transform = (!carouselInner.style.transform) ? 0 : parseInt(carouselInner.style.transform.slice(11));

      arrowLeft = div.querySelector('.carousel__arrow_left');
      arrowRight = div.querySelector('.carousel__arrow_right');
      (transform === -cntSlides * carouselInnerWidth) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
      (transform === 0) ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';

    }
    carousel.addEventListener('click',arrowsLeftRight);
}

  get elem() {
    return this._elem
  }
}
