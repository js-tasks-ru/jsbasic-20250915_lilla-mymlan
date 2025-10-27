import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    let stepsArrow = []
    for(let i = 1; i<= this.steps;i++) {
      if(i === 1) {
        stepsArrow.push(`<span class="slider__step-active"></span>`);
      }
      else {
        stepsArrow.push(`<span></span>`);
      }
    }

    const span = stepsArrow.join('');

    this.elem = createElement(
      `<div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${span}
      </div>`
    )

    this.onClick();
    this.onMove();

    return this.elem;
  }

  onClick() {
    let slider = this.elem;
    let sliderValue = slider.querySelector('.slider__value');
    slider.addEventListener('click',(event) => {
      let sliderSteps = this.elem.querySelector('.slider__steps');
      let sliderStep = sliderSteps.querySelector(`:nth-child(${this.value + 1})`);
      sliderStep.classList.remove('slider__step-active');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;

      sliderValue.textContent = this.value;

      sliderStep = sliderSteps.querySelector(`:nth-child(${this.value + 1})`);

      sliderStep.classList.add('slider__step-active');

      let thumb = this.elem.querySelector('.slider__thumb');
      let sliderProgress = this.elem.querySelector('.slider__progress');

      thumb.style.left = `${valuePercents}%`;
      sliderProgress.style.width = `${valuePercents}%`;

      let sliderChange = new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
      });

      slider.dispatchEvent(sliderChange);
      slider.addEventListener('slider-change',() => {}) 
    })
  }

  onMove() {
    let slider = this.elem;
    let thumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = slider.querySelector('.slider__value');
    let steps = this.steps;
    console.log(this.value);

    thumb.onpointerdown = function(event) {
      slider.classList.add('slider_dragging');
      function onMoseMove(event) {
        let sliderSteps = slider.querySelector('.slider__steps');
        //let sliderStep = sliderSteps.querySelector(`:nth-child(${sliderValue.textContent})`);
        //if(sliderStep) sliderStep.classList.remove('slider__step-active');
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;

        let segments = steps - 1;
        let approximateValue = leftRelative * segments;

        let value = Math.round(approximateValue);
        sliderValue.textContent = value;
        this.value = value;

        for(let s of sliderSteps.children) {
          s.classList.remove('slider__step-active');
        };
        let sliderStep = sliderSteps.querySelector(`:nth-child(${value + 1})`);

        if(sliderStep) sliderStep.classList.add('slider__step-active');
      }

      document.addEventListener('pointermove',onMoseMove);

      document.onpointerup = function() {
        console.log('pointerup');
        document.removeEventListener('pointermove',onMoseMove);
        document.onpointerup = null;
        slider.classList.remove('slider_dragging');

        let sliderChange = new CustomEvent('slider-change', { 
          detail: this.value, 
          bubbles: true 
        });

        slider.dispatchEvent(sliderChange);
        slider.addEventListener('slider-change',() => {}) 
      }
    }
    
    thumb.ondragstart = function() {
      return false;
    };

  }
}
