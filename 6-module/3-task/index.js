import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement(`div`)
    this.render()
    this.initCarousel()
    this.addEventListener()


  }
  render() {
    this.elem.classList.add('carousel')
    this.elem.innerHTML = `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner"></div>`
    let carouselInner = this.elem.querySelector('.carousel__inner')

    for (let key of this.slides) {
      carouselInner.insertAdjacentHTML('beforeend', `
    <div class="carousel__slide" data-id="${key.id}">
      <img src="/assets/images/carousel/${key.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${key.price.toFixed(2)}</span>
      <div class="carousel__title">${key.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>
      `)
      let carouselButton = this.elem.querySelector('.carousel__button')
      carouselButton.dispatchEvent(new CustomEvent("product-add", {
        detail: this.slides.id,
        bubbles: true
      }));
    }
  }
  initCarousel() {
    let currentSlideNumber = 0;
    let slidesAmount = this.slides.length;
    let carouselInnerElem = this.elem.querySelector('.carousel__inner');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');

    update();

    this.elem.onclick = ({ target }) => {
      if (target.closest('.carousel__arrow_right')) {
        next();
      }

      if (target.closest('.carousel__arrow_left')) {
        prev();
      }
    };

    function next() {
      currentSlideNumber++;
      update();
    }

    function prev() {
      currentSlideNumber--;
      update();
    }

    function update() {
      let offset = -carouselInnerElem.offsetWidth * currentSlideNumber;
      carouselInnerElem.style.transform = `translateX(${offset}px)`;

      if (currentSlideNumber == slidesAmount - 1) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }

      if (currentSlideNumber == 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }
    }
  }

  addEventListener() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        let id = e.target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: id,
          bubbles: true
        }));

      }
    })
  }
}