gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

function navAnimation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const toggle = document.getElementById("toggle");
      toggle.checked = false;

      const target = this.getAttribute("href");

      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: target, offsetY: 80 },
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

function sliderFunc() {
  const previous = document.querySelector(".slider-btn-previous");
  const next = document.querySelector(".slider-btn-next");
  const images = document.querySelectorAll(".slider-img");
  const slider = document.querySelector(".slider-images");
  const totalImages = images.length;
  const imageWidth = images[0].clientWidth;
  let currentPosition = 0;
  let touchStartX = 0;
  let currentImage = 0;
  const isMobile = window.screen.width < 768;

  function swapImages(direction) {
    const lastImgPosition = isMobile
      ? -(imageWidth * (totalImages - 2))
      : -(imageWidth * (totalImages - 4));

    gsap.defaults({ duration: 0.1 });

    if (direction === "next") {
      currentPosition -= imageWidth;
      currentImage++;

      if (currentPosition >= lastImgPosition) {
        gsap.to(previous, { autoAlpha: 1 });
      } else {
        gsap.to(next, { autoAlpha: 0 });
      }
    } else if (direction === "previous") {
      currentPosition += imageWidth;
      currentImage--;

      if (currentPosition < 0) {
        gsap.to(next, { autoAlpha: 1 });
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

    const lastImg = isMobile ? totalImages - 1 : totalImages - 3;

    if (touchDiff > 0 && currentImage < lastImg) {
      swapImages("next");
    } else if (touchDiff < 0 && currentImage > 0) {
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

function sliderAnimaiton() {
  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function () {
      const tl = gsap.timeline({ paused: true });

      tl.from(".slider-images figure", {
        yPercent: 100,
        stagger: 0.1,
        opacity: 0,
        duration: 0.7,
      });
      tl.from(".slider-buttons", { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: ".slider",
        start: "top 60%",
        onEnter: () => tl.play(),
      });

      ScrollTrigger.create({
        trigger: ".slider",
        start: "top 100%",
        onLeaveBack: () => tl.pause(0),
      });
    },
    "(min-width: 768px)": function () {
      const tl = gsap.timeline({ paused: true });

      tl.from(".slider-images figure", {
        x: 100,
        stagger: 0.1,
        opacity: 0,
        duration: 0.7,
      });
      tl.from(".slider-buttons", { autoAlpha: 0 }, "<0.6");

      ScrollTrigger.create({
        trigger: ".slider",
        start: "top 60%",
        onEnter: () => tl.play(),
      });

      ScrollTrigger.create({
        trigger: ".slider",
        start: "top 100%",
        onLeaveBack: () => tl.pause(0),
      });
    },
  });
}

function formFunc() {
  const form = document.querySelector(".contact-form");

  const formIn = gsap.timeline({ paused: true });
  formIn.from(".contact-form .form-item", {
    y: 100,
    stagger: 0.2,
    opacity: 0,
    duration: 0.7,
    ease: "power2",
  });

  ScrollTrigger.create({
    trigger: ".contact-form",
    start: "top 60%",
    onEnter: () => formIn.play(),
  });

  ScrollTrigger.create({
    trigger: ".contact-form",
    start: "top 100%",
    onLeaveBack: () => formIn.pause(0),
  });

  const formOut = gsap.timeline({ paused: true });
  formOut.to(".contact-form .form-item", {
    y: -100,
    stagger: 0.1,
    opacity: 0,
    duration: 0.7,
    ease: "power2",
  });

  function showMessage(message) {
    const contact = document.querySelector(".contact");
    const html = `<div class="contact-message container">
      <span>${message}</span>
    </div>`;
    contact.insertAdjacentHTML("beforeend", html);

    const contactMessage = document.querySelector(".contact-message");

    contactMessage.offsetHeight;

    const tl = gsap.timeline({ delay: 1.5 });
    tl.from(contactMessage, {
      yPercent: -100,
      autoAlpha: 0,
    });
    tl.to(
      contactMessage,
      {
        autoAlpha: 0,
        yPercent: 100,
        onComplete: () => {
          contactMessage.remove();

          form.reset();
          formOut.reverse();
        },
      },
      "<2"
    );
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(this);

    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();

    fetch("/mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        formOut.play();
        showMessage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  form.addEventListener("submit", handleFormSubmit);
}

window.onload = function () {
  introAnimation();
  navAnimation();
  sectionAnimation();
  projectsAnimation();
  sliderAnimaiton();
  sliderFunc();
  formFunc();
};
