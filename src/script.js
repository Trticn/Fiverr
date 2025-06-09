import Swiper from 'swiper';
import { Navigation,EffectCoverflow } from 'swiper/modules';



Swiper.use([Navigation, EffectCoverflow]);

new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  initialSlide: 2,
  loop: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  spaceBetween: -50, 

  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
    scale: 0.9,
  },

  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },

  breakpoints: {
    1024: {
      slidesPerView: 3,
      centeredSlides: true,
    },
    0: {
      slidesPerView: 1,
      centeredSlides: false,
    },
  },
});


document.querySelector(".nav__links").addEventListener("click", e => {
  e.preventDefault();

  const link = e.target.closest(".nav__link");
  if (!link) return;
  const id = link.getAttribute("href");
  const target = document.querySelector(id);
  if (!target) return;

  const offset = 10;

  if (target.classList.contains("section--hidden")) {
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth"
    });
  } else {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});




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

//ovde ima neki bag nekako ruzno se pojavi navigacija

// const nav = document.querySelector("nav");
// const header = document.querySelector("header");
// const headerSection = document.querySelector("#header_section");
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);

//   if (!entry.isIntersecting) header.classList.add("sticky");
//   else header.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(headerSection);

const faqItems = document.querySelectorAll(".faq-item");

function toggleFAQ(id) {
  const content = document.getElementById(`content-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  const path = icon.querySelector('path');
  if (content.style.maxHeight === "0px" || content.style.maxHeight === "") {
    content.style.maxHeight = content.scrollHeight + "px";
    path.setAttribute("d", "M20 12H4"); 
  } else {
    content.style.maxHeight = "0px";
    path.setAttribute("d", "M12 4v16m8-8H4"); 
  }

}


faqItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const id = index + 1; 
    toggleFAQ(id);
  });
});




const burger = document.getElementById('burger');
const sidebar = document.getElementById('mobileSidebar');

burger.addEventListener('click', () => {

    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('opacity-0');
    sidebar.classList.toggle('invisible');
    burger.classList.toggle('burger-open');

    // Sprečavanje skrolovanja
    document.body.classList.toggle('overflow-hidden');
    document.documentElement.classList.toggle('overflow-hidden');
});

sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');


    sidebar.classList.add('translate-x-full');
    sidebar.classList.add('opacity-0');
    sidebar.classList.add('invisible'); 
    burger.classList.remove('burger-open');
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');

    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (!target) return;

      const offset = 10;

      if (target.classList.contains('section--hidden')) {
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  });
});


