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
    tl.from(title, { xPercent: -100, opacity: 0, duration: 0.7 });
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

window.onload = function () {
  introAnimation();
  sectionAnimation();
};
