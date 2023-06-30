gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

function fadeOut(element, start, end) {
  gsap.fromTo(
    element,
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        start: `${start}`,
        end: `${end}`,
        scrub: true,
      },
    }
  );
}

function slideX(element, from, start, end) {
  gsap.fromTo(
    element,
    { x: from, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: `${start}`,
        end: `${end}`,
        scrub: true,
      },
    }
  );
}

function slideY(element, from, start, end) {
  gsap.fromTo(
    element,
    { y: from, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: `${start}`,
        end: `${end}`,
        scrub: true,
      },
    }
  );
}

function scrollMobile() {
  fadeOut(".intro", -100, 200);

  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => slideX(title, -500, -850, -150));

  const smoothHeadings = document.querySelectorAll(".smooth-headings");
  smoothHeadings.forEach((el) => fadeOut(el, 0, 300));

  const smoothTexts = document.querySelectorAll(".smooth-text");
  smoothTexts.forEach((el) => slideX(el, 500, -700, -300));

  const items = document.querySelectorAll(".projects-gallery-item");
  items.forEach((el) => slideY(el, 50, -850, -100));

  const images = document.querySelectorAll(".slider-img");
  images.forEach((el) => slideY(el, 50, -850, -100));

  slideY(".contact-form", 50, -850, -100);
}

function scrollDesktop() {
  fadeOut(".intro", -10, 300);

  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => slideX(title, -400, -850, -150));

  const smoothHeadings = document.querySelectorAll(".smooth-headings");
  smoothHeadings.forEach((el) => fadeOut(el, -100, 100));

  const smoothTexts = document.querySelectorAll(".smooth-text");
  smoothTexts.forEach((el) => slideX(el, 1000, -950, -300));

  const itemsLeft = document.querySelectorAll(
    ".projects-gallery-left .projects-gallery-item"
  );
  const itemsRight = document.querySelectorAll(
    ".projects-gallery-right .projects-gallery-item"
  );
  itemsLeft.forEach((el) => slideX(el, -20, -1200, -100));
  itemsRight.forEach((el) => slideX(el, 20, -1200, -100));

  const images = document.querySelectorAll(".slider-img");
  images.forEach((el, index) => {
    let start = -750 + index * 60;
    let end = -490 + index * 35;

    slideX(el, 400, start, end);
  });

  slideY(".contact-form", 50, -850, -100);
}

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroller
  if (ScrollTrigger.isTouch !== 1) {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
    });
  }

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
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

    const logoLinks = document.querySelectorAll(".logo");
    logoLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: 0 },
        });
      });
    });
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

  previous.addEventListener("click", () => swapImages("previous"));
  next.addEventListener("click", () => swapImages("next"));
  slider.addEventListener("touchstart", handleTouchStart);
  slider.addEventListener("touchmove", handleTouchMove);
  slider.addEventListener("touchend", handleTouchEnd);

  // Scrolling
  if (window.innerWidth <= 768) {
    scrollMobile();
  } else {
    scrollDesktop();
  }
});
