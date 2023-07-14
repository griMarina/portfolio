gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
  let tl = gsap.timeline();

  // Slide up loader
  tl.to("#loader-container", { yPercent: -100, delay: 1.5 });

  // Intro
  tl.from(".nav", { yPercent: -100 });
  tl.to("#img-first", {
    rotate: "0deg",
    duration: 0.7,
    autoAlpha: 1,
    ease: "power4",
  });
  tl.to(
    "#img-second",
    {
      rotate: "0deg",
      duration: 0.7,
      autoAlpha: 1,
      ease: "power4",
    },
    "<"
  );
  tl.to(
    "#img-third",
    {
      rotate: "0deg",
      duration: 0.4,
      autoAlpha: 1,
      ease: "power4",
    },
    "<0.3"
  );

  ScrollTrigger.matchMedia({
    "(min-width: 992px)": function () {
      tl.from(".intro-headings-name", {
        xPercent: -100,
        autoAlpha: 0,
        ease: "back",
      });
      tl.from(".intro-headings-title", {
        xPercent: 100,
        autoAlpha: 0,
        ease: "back",
      });
    },

    "(max-width: 991px)": function () {
      tl.from(".intro-headings-name", {
        yPercent: -100,
        autoAlpha: 0,

        ease: "back",
      });
      tl.from(".intro-headings-title", {
        yPercent: 100,
        autoAlpha: 0,
        ease: "back",
      });
    },
  });

  // About
  const textAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".smooth-headings",
      end: "top",
      scrub: 1,
      markers: true,
    },
  });

  textAnimation.from(".title", { xPercent: -100, duration: 0.7 });
  textAnimation.from(".smooth-text", { xPercent: 500, duration: 1 });
};
