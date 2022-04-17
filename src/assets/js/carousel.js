const track = document.querySelector('.carousel__track');
const prevBtn = document.querySelector('.carousel__btn--left');
const nextBtn = document.querySelector('.carousel__btn--right');
const dotsNav = document.querySelector('.carousel__nav');

const images = [
  { src: 'https://i.pinimg.com/originals/c2/8b/c9/c28bc99dafaeb107246f904f34bae16c.jpg' },
  { src: 'https://images.wallpaperscraft.com/image/single/space_galaxy_shine_137572_1280x720.jpg' },
  { src: 'https://cdn.wallpapersafari.com/74/30/v23HkS.jpg' },
  { src: 'https://wallpaperaccess.com/full/3971879.jpg' },
];

class Carousel {
  constructor(imgs) {
    this.totalSlides = imgs;
    this.slideWidth = 0;
  }

  moveSlide = (track, currentSlide, targetSlide) => {
    const amountToSlide = targetSlide.style.left;
    track.style.transform = `translateX(-${amountToSlide})`;
    currentSlide.classList.remove('current__slide');
    targetSlide.classList.add('current__slide');
    if (targetSlide === this.getSlides()[0]) {
      prevBtn.classList.add('is-hidden');
      nextBtn.classList.remove('is-hidden');
    } else if (targetSlide === this.getSlides()[this.getSlides().length - 1]) {
      prevBtn.classList.remove('is-hidden');
      nextBtn.classList.add('is-hidden');
    } else {
      prevBtn.classList.remove('is-hidden');
      nextBtn.classList.remove('is-hidden');
    }
  };

  loadData = () => {
    this.totalSlides.forEach((img, idx) => {
      let firstClass = '';
      let currentInd = '';
      if (idx === 0) {
        firstClass = 'current__slide';
        currentInd = 'current__carousel-indicator';
      }
      track.innerHTML += `
        <li class="carousel__slide ${firstClass}">
          <img class="carousel__image" src=${img.src} alt="carousel image">
        </li>`;

      dotsNav.innerHTML += `<button type="button" class="carousel__indicator ${currentInd}"></button>`;
    });
    this.adjustSlides();
  };

  getSlides = () => Array.from(track.children)

  getSlideWidth = () => this.getSlides()[0].getBoundingClientRect().width

  getCarouselNav = () => Array.from(dotsNav.children);

  adjustSlides = () => {
    const slides = this.getSlides();
    this.slideWidth = this.getSlideWidth();
    slides.forEach((img, idx) => {
      img.style.left = `${this.slideWidth * idx}px`;
    });
  }

  updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current__carousel-indicator');
    targetDot.classList.add('current__carousel-indicator');
  }
}

const carousel = new Carousel(images);

prevBtn.addEventListener('click', () => {
  const currentDot = document.querySelector('.current__carousel-indicator');
  const prevDot = currentDot.previousElementSibling;
  const currentSlide = track.querySelector('.current__slide');
  const prevSlide = currentSlide.previousElementSibling;
  carousel.moveSlide(track, currentSlide, prevSlide);
  carousel.updateDot(currentDot, prevDot);
});

nextBtn.addEventListener('click', () => {
  const currentDot = document.querySelector('.current__carousel-indicator');
  const nextDot = currentDot.nextElementSibling;
  const currentSlide = track.querySelector('.current__slide');
  const nextSlide = currentSlide.nextElementSibling;
  carousel.moveSlide(track, currentSlide, nextSlide);
  carousel.updateDot(currentDot, nextDot);
});

dotsNav.addEventListener('click', (event) => {
  const targetDot = event.target.closest('button');
  const dots = carousel.getCarouselNav();
  if (!targetDot) return;
  const currentSlide = document.querySelector('.current__slide');
  const currentDot = document.querySelector('.current__carousel-indicator');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = carousel.getSlides()[targetIndex];
  carousel.moveSlide(track, currentSlide, targetSlide);
  carousel.updateDot(currentDot, targetDot);
});

window.onload = () => {
  carousel.loadData();
};

window.onresize = () => {
  carousel.getSlideWidth();
};