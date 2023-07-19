gsap.registerPlugin(ScrollTrigger);

function introAnimation() {
  ScrollTrigger.matchMedia({
    "(min-width: 992px)": function () {
      let tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 0.7,
          ease: "power4",
        },
      });

      tl.from(".intro", { autoAlpha: 0 });
      tl.from(".nav", { autoAlpha: 0, y: -100 });
      tl.from("#img-first", {
        rotate: "-15deg",
        x: -100,
        y: 100,
        transformOrigin: "bottom left",
        duration: 1,
      });
      tl.from(
        "#img-second",
        {
          rotate: "15deg",
          x: 100,
          y: 100,
          duration: 1,
          transformOrigin: "bottom right",
        },
        "<"
      );
      tl.from(
        "#img-third",
        {
          rotate: "25deg",
          transformOrigin: "right",
        },
        "<0.3"
      );
      tl.from(
        ".intro-headings-name",
        {
          x: -100,
          ease: "back",
        },
        "-=0.3"
      );
      tl.from(
        ".intro-headings-title",
        {
          x: 100,
          ease: "back",
        },
        "<"
      );
    },

    "(max-width: 991px)": function () {
      let tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 0.7,
          ease: "power4",
        },
      });

      tl.from(".intro", { autoAlpha: 0 });
      tl.from(".nav", { autoAlpha: 0, y: -100 });
      tl.from("#img-first", {
        rotate: "-15deg",
        x: -100,
        y: 100,
        transformOrigin: "bottom left",
        duration: 1,
      });
      tl.from(
        "#img-second",
        {
          rotate: "15deg",
          x: 100,
          y: 100,
          duration: 1,
          transformOrigin: "bottom right",
        },
        "<"
      );
      tl.from(
        "#img-third",
        {
          rotate: "25deg",
          transformOrigin: "right",
        },
        "<0.3"
      );
      tl.from(
        ".intro-headings-name",
        {
          y: -100,
          ease: "back",
        },
        "-=0.3"
      );
      tl.from(
        ".intro-headings-title",
        {
          y: 100,
          ease: "back",
        },
        "<"
      );
    },
  });
}

function sectionAnimation() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    let title = section.querySelector(".title");
    let content = section.querySelector(".content");

    let tl = gsap.timeline({ paused: true });
    tl.from(title, { xPercent: -100, opacity: 0, duration: 1 });
    tl.from(content, { yPercent: 100, opacity: 0, duration: 0.8 }, 0);

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => tl.play(),
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 100%",
      onLeaveBack: () => tl.pause(0),
    });
  });
}

function projectsAnimation() {
  const projects = document.querySelectorAll(".projects-gallery figure");

  projects.forEach((project) => {
    const items = project.querySelectorAll(".item");

    items.forEach((element) => {
      const target = element.querySelector("div");

      const tl = gsap.timeline({ paused: true });

      if (target.classList.contains("img")) {
        tl.from(target, {
          duration: 0.6,
          opacity: 0,
          scale: 0.5,
          ease: "circ",
        });
      } else {
        tl.from(target, {
          duration: 0.6,
          opacity: 0,
          y: 100,
          ease: "circ",
        });
      }

      ScrollTrigger.create({
        trigger: project,
        start: "top 50%",
        onEnter: () => tl.play(),
      });

      ScrollTrigger.create({
        trigger: project,
        start: "top 100%",
        onLeaveBack: () => tl.pause(0),
      });
    });
  });
}

function sliderAnimation() {
  const previous = document.querySelector(".slider-btn-previous");
  const next = document.querySelector(".slider-btn-next");
  const images = document.querySelectorAll(".slider-img");
  const slider = document.querySelector(".slider-images");
  const totalImages = images.length;
  const imageWidth = images[0].clientWidth;
  let currentPosition = 0;
  let touchStartX = 0;

  function swapImages(direction) {
    const lastImgPosition = -(imageWidth * (totalImages - 1));

    if (direction === "next") {
      gsap.to(previous, { autoAlpha: 1 });

      if (currentPosition > lastImgPosition) {
        currentPosition -= imageWidth;
      } else {
        gsap.to(next, { autoAlpha: 0 });
      }
    } else if (direction === "previous") {
      gsap.to(next, { autoAlpha: 1 });

      if (currentPosition < 0) {
        currentPosition += imageWidth;
      } else {
        gsap.to(previous, { autoAlpha: 0 });
      }
    }

    gsap.to(slider, { x: currentPosition, duration: 0.7, ease: "power2" });
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
  next.addEventListener("click", () => {
    swapImages("next");
  });
  slider.addEventListener("touchstart", handleTouchStart);
  slider.addEventListener("touchmove", handleTouchMove);
  slider.addEventListener("touchend", handleTouchEnd);
}

window.onload = function () {
  introAnimation();
  sectionAnimation();
  projectsAnimation();
  sliderAnimation();
};
