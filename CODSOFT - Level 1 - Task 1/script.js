const header = document.querySelector(".header");
const aboutSection = document.querySelector(".about-section");

// Sticky Navigation
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

observer.observe(aboutSection);
