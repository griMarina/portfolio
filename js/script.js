const previous = document.querySelector(".slider-btn-previous");
const next = document.querySelector(".slider-btn-next");
const images = document.querySelectorAll(".slider-img");
const slider = document.querySelector(".slider-images");
const totalImages = images.length;
const imageWidth = images[0].clientWidth;
let currentPosition = 0;
let touchStartX = 0;

// Event Listeners to previous and next buttons
previous.addEventListener("click", () => swapImages("previous"));
next.addEventListener("click", () => swapImages("next"));
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchmove", handleTouchMove);
slider.addEventListener("touchend", handleTouchEnd);

function swapImages(direction) {
  if (direction === "next") {
    currentPosition -= imageWidth;
  } else if (direction === "previous") {
    currentPosition += imageWidth;
  }

  const lastImage =
    window.innerWidth <= 768 ? totalImages - 1 : totalImages - 3;
  const loopBackPosition = -(lastImage * imageWidth);

  if (currentPosition < loopBackPosition) {
    currentPosition = 0;
  } else if (currentPosition > 0) {
    currentPosition = loopBackPosition;
  }

  slider.style.transform = `translate(${currentPosition}px, 0px)`;
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (touchStartX === 0) return;

  const touchCurrentX = event.touches[0].clientX;
  const touchDiff = touchStartX - touchCurrentX;

  if (touchDiff > 0) {
    swapImages("next");
  } else if (touchDiff < 0) {
    swapImages("previous");
  }

  touchStartX = 0;
}

function handleTouchEnd() {
  touchStartX = 0;
}

// const $menu = document.querySelector(".slider-images");
// const $items = document.querySelectorAll(".slider-item");
// const $images = document.querySelectorAll(".slider-item img");
// // let menuWidth = $menu.clientWidth;
// let itemWidth = $items[0].clientWidth;
// let wrapWidth = $items.length * itemWidth;

// console.log(itemWidth, wrapWidth);

// let scrollSpeed = 0;
// let oldScrollY = 0;
// let scrollY = 0;
// let y = 0;

// const lerp = (v0, v1, t) => {
//   return v0 * (1 - t) + v1 * t;
// };

// const dispose = (scroll) => {
//   gsap.set($items, {
//     x: (i) => {
//       return i + scroll;
//     },
//     modifiers: {
//       x: (x, target) => {
//         const s = gsap.utils.wrap(
//           -itemWidth,
//           wrapWidth - itemWidth,
//           parseInt(x)
//         );
//         return `${s}px`;
//       },
//     },
//   });
// };
// dispose(0);

// const handleMouseWheel = (e) => {
//   scrollY -= e.deltaX * 0.9;
// };

// $menu.addEventListener("mousewheel", handleMouseWheel);

// const render = () => {
//   requestAnimationFrame(render);
//   y = lerp(y, scrollY, 0.1);
//   dispose(y);
// };

// render();
