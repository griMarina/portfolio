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

function slideTo(element, to, start, end) {
  gsap.fromTo(
    element,
    { x: to },
    {
      x: 0,
      scrollTrigger: {
        trigger: element,
        start: `${start}`,
        end: `${end}`,
        scrub: true,
      },
    }
  );
}

function slideFrom(element, from, start, end) {
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

// Smooth scroller
if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
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

  fadeOut(".intro", -50, 300);

  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => slideTo(title, -400, -850, -150));

  const smoothHeadings = document.querySelectorAll(".smooth-headings");
  smoothHeadings.forEach((el) => fadeOut(el, -100, 100));

  const smoothTexts = document.querySelectorAll(".smooth-text");
  smoothTexts.forEach((el) => slideFrom(el, 1000, -950, -300));

  // Projects
  const itemsLeft = document.querySelectorAll(
    ".projects-gallery-left .projects-gallery-item"
  );
  itemsLeft.forEach((el) => slideFrom(el, -50, -900, -200));

  const itemsRight = document.querySelectorAll(
    ".projects-gallery-right .projects-gallery-item"
  );
  itemsRight.forEach((el) => slideFrom(el, 50, -900, -200));

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

  images.forEach((el, index) => {
    let start = -750 + index * 60;
    let end = -410 + index * 35;

    slideFrom(el, 400, start, end);
  });
});
