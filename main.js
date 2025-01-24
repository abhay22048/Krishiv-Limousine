document.addEventListener("DOMContentLoaded", function () {
  // Menu Toggle Logic
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn ? menuBtn.querySelector("i") : null;

  if (menuBtn && navLinks && menuBtnIcon) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  } else {
    console.error("Menu button or nav links are missing.");
  }

  // Scroll Reveal Options
  const scrollRevealOptions = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  };

  const revealElements = [
    { selector: ".header__container h1", options: {} },
    { selector: ".header__container form", options: { delay: 500 } },
    { selector: ".header__container img", options: { delay: 1000 } },
    { selector: ".range__card", options: { duration: 1000, interval: 500 } },
    { selector: ".location__image img", options: { origin: "right" } },
    { selector: ".location__content .section__header", options: { delay: 500 } },
    { selector: ".location__content p", options: { delay: 1000 } },
    { selector: ".location__content .location__btn", options: { delay: 1500 } },
    { selector: ".story__card", options: { interval: 500 } },
    { selector: ".download__image img", options: { origin: "right" } },
    { selector: ".contact-item", options: { delay: 500 } },
    { selector: ".download__content .section__header", options: { delay: 500 } },
    { selector: ".download__links", options: { delay: 1000 } },
  ];

  revealElements.forEach(({ selector, options }) => {
    ScrollReveal().reveal(selector, { ...scrollRevealOptions, ...options });
  });

  // Swiper Logic
  const selectCards = document.querySelectorAll(".select__card");
  if (selectCards.length > 0) {
    selectCards[0].classList.add("show__info");
  }

  const price = ["225", "455", "275", "625", "395"];
  const priceEl = document.getElementById("select-price");

  function updateSwiperImage(eventName, args) {
    if (eventName === "slideChangeTransitionStart") {
      const index = args && args[0].realIndex;
      priceEl.innerText = price[index];

      selectCards.forEach((item) => {
        item.classList.remove("show__info");
      });

      selectCards[index].classList.add("show__info");
    }
  }

  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      depth: 500,
      modifier: 1,
      scale: 0.75,
      slideShadows: false,
      stretch: -100,
    },
    onAny(event, ...args) {
      updateSwiperImage(event, args);
    },
  });

  // Banner Duplication Logic
  const banner = document.querySelector(".banner__wrapper");
  if (banner) {
    const bannerContent = Array.from(banner.children);

    bannerContent.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      banner.appendChild(duplicateNode);
    });
  }

});
