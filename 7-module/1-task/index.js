import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem
    this.render()
    this.initSlider()
    this.addEventListener()
  }
  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon')
    this.elem.innerHTML = `

    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
     <nav class="ribbon__inner">
     </nav>
     `
    let ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.categories.map(elem => {
      ribbonInner.insertAdjacentHTML('beforeend', `
      <a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>
      `)
    })
    this.elem.insertAdjacentHTML('beforeend', ` <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`)
  }
  initSlider() {
    let slideNumber = 0;
    let sliderAmount = this.categories.length;
    let sliderInnerElem = this.elem.querySelector('.ribbon__inner');
    let sliderlArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let sliderlArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    update();

    this.elem.onclick = ({ target }) => {
      if (target.closest('.ribbon__arrow_right')) {
        next();
      }

      if (target.closest('.ribbon__arrow_left')) {
        prev();
      }
    };

    function next() {
      sliderInnerElem.scrollBy(350, 0);
      update();
    }

    function prev() {
      sliderInnerElem.scrollBy(-350, 0);
      update();
    }

    function update() {
      let scrollLeft = sliderInnerElem.scrollLeft
      if (scrollLeft == '0') {
        sliderlArrowLeft.style.display = 'none';
      } else {
        sliderlArrowLeft.style.display = 'flex';
      }
      if (sliderInnerElem.scrollLeft == sliderInnerElem.scrollWidth - sliderInnerElem.scrollWidth) {
        sliderlArrowRight.style.display = 'flex';
      } else {
        sliderlArrowRight.style.display = '';

      }
    }
  }
  addEventListener() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.ribbon__item')) {
        let id = e.target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
          detail: id, // уникальный идентификатора категории из её объекта
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }));

      }
    })
  }
}


