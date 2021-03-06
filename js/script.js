console.log("Hello world!");

///////////////////////////////////////////////
// Set current year to copyright
const currentYear = new Date().getFullYear();
const copyrightYearEl = document.querySelector(".copyright-year");
copyrightYearEl.textContent = currentYear;

///////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", () => headerEl.classList.toggle("nav-open"));

///////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll(".smooth-link:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // 1. Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // 2. Scroll to other sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // 3. Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.remove("nav-open");
  });
});

// Get specific element's css style
const getSpecificStyleValue = function (node, propertyName) {
  const style = window.getComputedStyle(node).getPropertyValue(propertyName);
  const value = parseFloat(style);
  return value;
};

///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const heroParagraph = document.querySelector(".hero-description");
const htmlFontSize = getSpecificStyleValue(heroParagraph, "font-size") / 2;
console.log(htmlFontSize);

const rootMargin = `-${htmlFontSize * 8}px`;
const obs = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) document.body.classList.add("sticky");
    if (entry.isIntersecting) document.body.classList.remove("sticky");
  },
  {
    root: null, // In the viewport
    threshold: 0,
    rootMargin: rootMargin,
  }
);

obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
