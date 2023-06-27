gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the smooth scroller FIRST!
let scroller = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

// ScrollTrigger.normalizeScroll(true);

// ScrollSmoother.create({
//   trigger: ".intro",
//   start: "top center",
//   end: "bottom center",
//   scrub: true,
//   onUpdate: (self) => {
//     const progress = self.progress.toFixed(2);

//     // Adjust the scrolling speed for intro-img
//     const introImgSpeed = 0.5; // Modify this value as needed
//     const introImgY = -progress * introImgSpeed * 100;
//     gsap.to(".intro-img", { y: -introImgY });

//     // Adjust the scrolling speed for intro-headings
//     const introHeadingsSpeed = 1.5; // Modify this value as needed
//     const introHeadingsY = -progress * introHeadingsSpeed * 100;
//     gsap.to(".intro-headings", { y: introHeadingsY });
//   },
// });

// ScrollSmoother.create({
//   wrapper: ".wrapper",
//   content: ".content",
//   smooth: 1.2,
//   effects: true,
// });

// gsap.fromTo(
//   ".intro",
//   { opacity: 1 },
//   {
//     opacity: 0,
//     scrollTrigger: {
//       trigger: ".intro",
//       start: "top 20%",
//       end: "bottom 30%",
//       scrub: true,
//     },
//   }
// );

// gsap.fromTo(
//   ".intro-img",
//   { opacity: 1 },
//   {
//     opacity: 0,
//     // y: -0,
//     scrollTrigger: {
//       trigger: ".intro-img",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//     },
//   }
// );

// gsap.fromTo(
//   ".intro-headings",
//   { opacity: 1 },
//   {
//     opacity: 0,
//     // y: -100,
//     scrollTrigger: {
//       trigger: ".intro-headings",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//     },
//   }
// );

// const titles = document.querySelectorAll(".title");
// console.log(titles);
// titles.forEach((title) => {
//   console.log(title);
//   gsap.fromTo(
//     title,
//     { x: -500, opacity: 0 },
//     {
//       opacity: 1,
//       x: 0,
//       scrollTrigger: {
//         trigger: title,
//         start: "-850",
//         end: "-100",
//         scrub: true,
//       },
//     }
//   );
// });

// Navigation links
// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav-links a");

//   navLinks.forEach(function (link) {
//     link.addEventListener("click", function (event) {
//       event.preventDefault();

//       const toggle = document.getElementById("toggle");
//       toggle.checked = false;

//       const target = this.getAttribute("href");

//       document.querySelector(target).scrollIntoView({
//         behavior: "smooth",
//         duration: 2000,
//       });
//     });
//   });
// });

// Slider
const previous = document.querySelector(".slider-btn-previous");
const next = document.querySelector(".slider-btn-next");
const images = document.querySelectorAll(".slider-img");
const slider = document.querySelector(".slider-images");
const totalImages = images.length;
const imageWidth = images[0].clientWidth;
let currentPosition = 0;
let touchStartX = 0;

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
  event.preventDefault();

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
