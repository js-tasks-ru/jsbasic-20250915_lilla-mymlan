function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner');
  const carouselInnerWidth = carouselInner.offsetWidth;
  let carousel = document.querySelector('.carousel');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  arrowLeft.style.display = 'none';
  function arrowsLeftRight (event) {
    let arrowRight = event.target.closest('.carousel__arrow_right');
    let arrowLeft = event.target.closest('.carousel__arrow_left');
    let transform = (!carouselInner.style.transform) ? 0 : parseInt(carouselInner.style.transform.slice(11));
    
    if(arrowLeft) carouselInner.style.transform = `translateX(${transform + carouselInnerWidth}px)`;
    
    if(arrowRight) carouselInner.style.transform = `translateX(${transform - carouselInnerWidth}px)`;
      
    transform = (!carouselInner.style.transform) ? 0 : parseInt(carouselInner.style.transform.slice(11));
    
    arrowLeft = document.querySelector('.carousel__arrow_left');
    arrowRight = document.querySelector('.carousel__arrow_right');
    (transform === -3 * carouselInnerWidth) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
    (transform === 0) ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';

  }
  carousel.addEventListener('click',arrowsLeftRight);
}
