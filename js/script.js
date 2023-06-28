gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Smooth scroller
ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

// Navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const toggle = document.getElementById("toggle");
      toggle.checked = false;

      const target = this.getAttribute("href");

      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: target, offsetY: 100 },
      });
    });
  });
});

// Intro section
gsap.fromTo(
  ".intro",
  { opacity: 1 },
  {
    opacity: 0,
    scrollTrigger: {
      trigger: ".intro",
      start: "-50",
      end: "300",
      scrub: true,
    },
  }
);

// Titles h2
const titles = document.querySelectorAll(".title");
titles.forEach((title) => {
  gsap.fromTo(
    title,
    { x: -400 },
    {
      x: 0,
      scrollTrigger: {
        trigger: title,
        start: "-850",
        end: "-150",
        scrub: true,
      },
    }
  );
});

const smoothHeadings = gsap.utils.toArray(".smooth-headings");
smoothHeadings.forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: el,
        start: "-100",
        end: "100",
        scrub: true,
      },
    }
  );
});

const smoothTexts = gsap.utils.toArray(".smooth-text");
smoothTexts.forEach((el) => {
  gsap.fromTo(
    el,
    { x: 1000, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start: "-950",
        end: "-300",
        scrub: true,
      },
    }
  );
});

// Projects
const itemsLeft = gsap.utils.toArray(
  ".projects-gallery-left .projects-gallery-item"
);
itemsLeft.forEach((item) => {
  gsap.fromTo(
    item,
    { x: -50, opacity: 0 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: item,
        start: "-900",
        end: "-50",
        scrub: true,
      },
    }
  );
});

const itemsRight = gsap.utils.toArray(
  ".projects-gallery-right .projects-gallery-item"
);
itemsRight.forEach((item) => {
  gsap.fromTo(
    item,
    { x: 50, opacity: 0 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: item,
        start: "-900",
        end: "-150",
        scrub: true,
      },
    }
  );
});

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

images.forEach((item, index) => {
  let start = -950 + index * 25;
  let end = -20 + index * 5;
  gsap.fromTo(
    item,
    { x: 400, opacity: 0 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: item,
        start: `${start}`,
        end: `${end}`,
        scrub: true,
      },
    }
  );
});
