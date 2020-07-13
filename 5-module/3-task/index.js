function initCarousel() {
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselInner = document.querySelector('.carousel__inner')
  let carouselSlide = document.querySelector('.carousel__slide')
  let wightSlides = 0;
  let numSlides = 4;

  carouselArrowLeft.style.display = 'none';
  document.addEventListener('click', function (e) {
    if (e.target.closest('div') == carouselArrowLeft) {
      wightSlides += carouselSlide.offsetWidth
      if (wightSlides >= 0) {
        wightSlides = 0;
        carouselArrowLeft.style.display = 'none';
        carouselArrowRight.style.display = 'flex';
      }
      carouselInner.style.transform = `translateX(${wightSlides}px)`

    }
    if (e.target.closest('div') == carouselArrowRight) {
      wightSlides -= carouselSlide.offsetWidth
      if (wightSlides <= -carouselSlide.offsetWidth * (numSlides - 1)) {
        wightSlides = -carouselSlide.offsetWidth * (numSlides - 1);
        carouselArrowRight.style.display = 'none';
      }
      carouselArrowLeft.style.display = 'flex';

      carouselInner.style.transform = `translateX(${wightSlides}px)`
    }

  })
}

