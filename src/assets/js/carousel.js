const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel__btn--left');
const nextBtn = document.querySelector('.carousel__btn--right');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((img, idx) => {
  img.style.left = `${slideWidth * idx}px`;
});

// const images = [
//   { src: 'https://i.pinimg.com/originals/c2/8b/c9/c28bc99dafaeb107246f904f34bae16c.jpg' },
//   { src: 'https://images.wallpaperscraft.com/image/single/space_galaxy_shine_137572_1280x720.jpg' },
//   { src: 'https://cdn.wallpapersafari.com/74/30/v23HkS.jpg' },
//   { src: 'https://wallpaperaccess.com/full/3971879.jpg' },
// ];

// window.onload = () => {
//   images.forEach((img, idx) => {
//     let firstClass = '';
//     if (idx === 0) {
//       firstClass = 'current_slide';
//     }
//     track.innerHTML += `
// <li class="carousel__slide">
// <img class="carousel__image ${firstClass}" src=${img.src} alt="carousel image">
// </li>`;
//   });
// };

const moveSlide = (track, currentSlide, targetSlide) => {
  const amountToSlide = targetSlide.style.left;
  track.style.transform = `translateX(-${amountToSlide})`;
  currentSlide.classList.remove('current__slide');
  targetSlide.classList.add('current__slide');
  if (targetSlide === slides[0]) {
    prevBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
  } else if (targetSlide === slides[slides.length - 1]) {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.remove('is-hidden');
  }
};

prevBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current__slide');
  const prevSlide = currentSlide.previousElementSibling;
  moveSlide(track, currentSlide, prevSlide);
});

nextBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current__slide');
  const nextSlide = currentSlide.nextElementSibling;
  moveSlide(track, currentSlide, nextSlide);
});

dotsNav.addEventListener('click', (event) => {
  const targetDot = event.target.closest('button');
  if (!targetDot) return;
  const currentSlide = document.querySelector('.current__slide');
  const currentDot = document.querySelector('.current__carousel-indicator');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex]
  moveSlide(track, currentSlide, targetSlide);

  currentDot.classList.remove('current__carousel-indicator')
  targetDot.classList.add('current__carousel-indicator')
})