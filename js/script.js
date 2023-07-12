gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// document.addEventListener("DOMContentLoaded", function () {
//   function fadeOut(element, start, end) {
//     gsap.fromTo(
//       element,
//       { opacity: 1 },
//       {
//         opacity: 0,
//         scrollTrigger: {
//           trigger: element,
//           start: `${start}`,
//           end: `${end}`,
//           scrub: true,
//         },
//       }
//     );
//   }

//   function slideX(element, from, start, end) {
//     gsap.fromTo(
//       element,
//       { x: from, opacity: 0 },
//       {
//         x: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: element,
//           start: `${start}`,
//           end: `${end}`,
//           scrub: true,
//         },
//       }
//     );
//   }

//   function slideY(element, from, start, end) {
//     gsap.fromTo(
//       element,
//       { y: from, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: element,
//           start: `${start}`,
//           end: `${end}`,
//           scrub: true,
//         },
//       }
//     );
//   }

//   const isMobile = Math.min(window.screen.width, window.screen.height) < 768;

//   // Scrolling
//   // if (isMobile) {
//   //   fadeOut(".intro", -100, 200);

//   //   const titles = document.querySelectorAll(".title");
//   //   titles.forEach((title) => slideX(title, -50, -700, -400));

//   //   const smoothHeadings = document.querySelectorAll(".smooth-headings");
//   //   smoothHeadings.forEach((el) => fadeOut(el, 0, 300));

//   //   const smoothTexts = document.querySelectorAll(".smooth-text");
//   //   smoothTexts.forEach((el) => slideY(el, 100, -700, -400));

//   //   const items = document.querySelectorAll(".projects-gallery-item");
//   //   items.forEach((el) => slideY(el, 100, -850, -300));

//   //   const slider = document.querySelector(".slider-images");
//   //   slideY(slider, 50, -850, -400);

//   //   slideY(".contact-form", 100, -850, -400);
//   // } else {
//   //   fadeOut(".intro", -10, 300);

//   //   const titles = document.querySelectorAll(".title");
//   //   titles.forEach((title) => slideX(title, -500, -850, -150));

//   //   const smoothHeadings = document.querySelectorAll(".smooth-headings");
//   //   smoothHeadings.forEach((el) => fadeOut(el, -100, 100));

//   //   const smoothTexts = document.querySelectorAll(".smooth-text");
//   //   smoothTexts.forEach((el) => slideX(el, 1000, -950, -150));

//   //   const itemsLeft = document.querySelectorAll(
//   //     ".projects-gallery-left .projects-gallery-item"
//   //   );
//   //   const itemsRight = document.querySelectorAll(
//   //     ".projects-gallery-right .projects-gallery-item"
//   //   );
//   //   itemsLeft.forEach((el) => slideX(el, -20, -1200, -100));
//   //   itemsRight.forEach((el) => slideX(el, 20, -1200, -100));

//   //   const slider = document.querySelector(".slider-images");
//   //   slideY(slider, 50, -950, -400);

//   //   slideY(".contact-form", 50, -850, -400);
//   // }

//   // Navigation links
//   const navLinks = document.querySelectorAll(".nav-link");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (event) {
//       event.preventDefault();

//       const toggle = document.getElementById("toggle");
//       toggle.checked = false;

//       const target = this.getAttribute("href");

//       gsap.to(window, {
//         duration: 0.5,
//         scrollTo: { y: target, offsetY: 100 },
//       });
//     });

//     const logoLinks = document.querySelectorAll(".logo");
//     logoLinks.forEach((link) => {
//       link.addEventListener("click", (event) => {
//         event.preventDefault();
//         gsap.to(window, {
//           duration: 0.5,
//           scrollTo: { y: 0 },
//         });
//       });
//     });
//   });

//   // Slider
//   const previous = document.querySelector(".slider-btn-previous");
//   const next = document.querySelector(".slider-btn-next");
//   const images = document.querySelectorAll(".slider-img");
//   const slider = document.querySelector(".slider-images");
//   const totalImages = images.length;
//   const imageWidth = images[0].clientWidth;
//   let currentPosition = 0;
//   let touchStartX = 0;

//   function swapImages(direction) {
//     if (direction === "next") {
//       currentPosition -= imageWidth;
//     } else if (direction === "previous") {
//       currentPosition += imageWidth;
//     }

//     const lastImage = isMobile ? totalImages - 1 : totalImages - 3;
//     const loopBackPosition = -(lastImage * imageWidth);

//     if (currentPosition < loopBackPosition) {
//       currentPosition = 0;
//     } else if (currentPosition > 0) {
//       currentPosition = loopBackPosition;
//     }

//     slider.style.transform = `translate(${currentPosition}px, 0px)`;
//   }

//   function handleTouchStart(event) {
//     touchStartX = event.touches[0].clientX;
//   }

//   function handleTouchMove(event) {
//     event.preventDefault();

//     if (touchStartX === 0) return;

//     const touchCurrentX = event.touches[0].clientX;
//     const touchDiff = touchStartX - touchCurrentX;

//     if (touchDiff > 0) {
//       swapImages("next");
//     } else if (touchDiff < 0) {
//       swapImages("previous");
//     }

//     touchStartX = 0;
//   }

//   function handleTouchEnd() {
//     touchStartX = 0;
//   }

//   previous.addEventListener("click", () => swapImages("previous"));
//   next.addEventListener("click", () => swapImages("next"));
//   slider.addEventListener("touchstart", handleTouchStart);
//   slider.addEventListener("touchmove", handleTouchMove);
//   slider.addEventListener("touchend", handleTouchEnd);

//   // Form submit
//   const form = document.querySelector(".contact-form");

//   function animateFormOut() {
//     const tl = new TimelineMax();
//     tl.to(form, 0.5, { y: -400, opacity: 0, ease: Power1.easeOut });
//     tl.set(form, { visibility: "hidden" });
//   }

//   function showMessage(message) {
//     const contact = document.querySelector(".contact");
//     const html = `<div class="contact-message container">
//       <span>${message}</span>
//     </div>`;
//     contact.insertAdjacentHTML("beforeend", html);

//     const contactMessage = document.querySelector(".contact-message");

//     contactMessage.offsetHeight;

//     const tl = new TimelineMax();
//     tl.to(contactMessage, 0.5, {
//       opacity: 1,
//       translateY: 0,
//       ease: Power1.easeOut,
//       delay: 0.5,
//     });

//     setTimeout(() => {
//       tl.to(contactMessage, 0.5, {
//         opacity: 0,
//         translateY: -400,
//         ease: Power1.easeOut,
//         onComplete: () => {
//           contactMessage.remove();

//           form.reset();

//           form.style.visibility = "visible";
//           form.style.opacity = 1;
//           form.style.transform = "translateY(0)";
//         },
//       });
//     }, 2000);
//   }

//   function handleFormSubmit(event) {
//     event.preventDefault();

//     const data = new FormData(this);

//     const name = data.get("name").trim();
//     const email = data.get("email").trim();
//     const message = data.get("message").trim();

//     fetch("./src/mail.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         message: message,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "OK") {
//           animateFormOut();
//           showMessage(data.message);
//         } else {
//           animateFormOut();
//           showMessage(data.message);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   form.addEventListener("submit", handleFormSubmit);
// });

document.addEventListener("DOMContentLoaded", function () {
  gsap
    .timeline()
    .from("header", { yPercent: -100 })
    .from("#img-first", {
      xPercent: -100,
      opacity: 0,
      ease: "expo",
    })
    .from("#img-second", {
      xPercent: 100,
      opacity: 0,
      ease: "expo",
    })
    .from("#img-third", {
      xPercent: 100,
      opacity: 0,
      ease: "expo",
    })
    .from(".intro-headings-name", {
      yPercent: -100,
      opacity: 0,
      ease: "back",
    })
    .from(".intro-headings-title", {
      yPercent: 100,
      opacity: 0,
      ease: "back",
    });
});
