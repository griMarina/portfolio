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

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      projects.forEach((element, index) => {
        let items = element.querySelectorAll(".item");
        let distance = index % 2 === 0 ? 100 : -100;
        let tl = gsap.timeline({ paused: true });

        tl.from(items, {
          duration: 0.5,
          xPercent: gsap.utils.wrap([-distance, distance]),
        });
        tl.from(items, { opacity: 0, duration: 0.3 }, 0);

        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => tl.play(),
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 100%",
          onLeaveBack: () => tl.pause(0),
        });
      });
    },

    "(max-width: 767px)": function () {
      gsap.utils.toArray(".item").forEach((element, index) => {
        let target = element.querySelector("div");

        let tl = gsap.timeline({ paused: true });
        if (target.classList.contains("img")) {
          tl.from(target, { duration: 0.5, opacity: 0, scale: 0.8 });
        } else {
          tl.from(target, { duration: 0.5, opacity: 0, y: 100 });
        }

        ScrollTrigger.create({
          trigger: element,
          start: "top 90%",
          onEnter: () => tl.play(),
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 100%",
          onLeaveBack: () => tl.pause(0),
        });
      });
    },
  });
}

window.onload = function () {
  introAnimation();
  sectionAnimation();
  projectsAnimation();
};
