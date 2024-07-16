const header = document.querySelector(".header");
const aboutSection = document.querySelector(".about-section");
const allSections = document.querySelectorAll(".section");
const footer = document.querySelector("footer");

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

// Footer Text
footer.textContent = `Copyright © ${new Date().getFullYear()} by Prabhu M P, This project is used under the
      condition of learning front-end web development and designs for the future
      usage`;
