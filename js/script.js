gsap.registerPlugin(ScrollTrigger);

function introAnimation() {
  let tl = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 0.7,
      ease: "power4",
    },
  });

  tl.from(".intro", { autoAlpha: 0 });
  tl.from(".nav", { y: -100 });
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

  ScrollTrigger.matchMedia({
    "(min-width: 992px)": function () {
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

// About
// const textAnimation = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".smooth-headings",
//     end: "top",
//     scrub: 1,
//     markers: true,
//   },
// });
// textAnimation.from(".title", { xPercent: -100, duration: 0.7 });
// textAnimation.from(".smooth-text", { xPercent: 500, duration: 1 });

window.onload = function () {
  introAnimation();
};
