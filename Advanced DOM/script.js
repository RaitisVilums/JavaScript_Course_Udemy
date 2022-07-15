"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = (event) => {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", (event) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("nav__link")) {
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Event Delegation
tabsContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) {
    return;
  }
  // Active tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((cont) =>
    cont.classList.remove("operations__content--active")
  );

  // Activate Tab__content
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE ANIMATION

const nav = document.querySelector(".nav");
const handleHover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// Sticky navigation
// const initialCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', event => {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

// Reveal section
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace the images to images-lazy
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

// SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("HTML PARSED AND DOM TREE BUILT!");
});

window.addEventListener("load", (event) => {
  console.log("Page full loaded", event);
});

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  console.log(event);
  event.returnValue = "";
});
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', event => {
//   const s1coords = section1.getBoundingClientRect();
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector('h1');
// const alertH1 = event => {
//   alert('addEventListiner: GREAT!');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // 1) Element selection

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // Selecting single element
// const header = document.querySelector('.header');
// // Selecting all elements
// const allSelection = document.querySelectorAll('.section');
// console.log(allSelection);

// // Selecting element by unique ID
// document.getElementById('section--1');
// // Selecting all elements by the TAG
// const allTagElements = document.getElementsByTagName('button');
// console.log(allTagElements);

// // Selecting all elements by Class
// document.getElementsByClassName('btn');

// // 2) Creating n inserting elements
// // .insertAdjecentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analitics';
// message.innerHTML =
//   'We use cookies for improved functionality and analitics. <button class="btn btn--close-cookie"> Got It</button>';
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// // 3) Deleting elements

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', event => {
//     message.remove();
//     // Old version
//     // message.parentElement.removeChild(message);
//   });

// // 4) Styling

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// // Get any CSS style on the element
// console.log(getComputedStyle(message).color);

// message.style.height = (getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // 5) Attributes

// // Like this you can read standart settings of the attribute
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// //  Non-standart
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// // Data-attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('d');
// logo.classList.remove('d');
// logo.classList.toggle('d');
// logo.classList.contains('d');

// // Don't use this, cuz it will overwrite all classes

// logo.className = 'raitis';
