const features = document.querySelectorAll(".feature");
const navMenu = document.querySelector(".nav__menu");
const burgerMenu = document.querySelector(".nav__burgerMenu");
const menuBtn = document.querySelector(".button--menu");
const closeBtn = document.querySelector(".button--close");
const nav = document.querySelector("nav");

const mediaQuery = window.matchMedia("(max-width: 768px)");

class App {
  constructor() {
    this._featuresAnim();
    menuBtn.addEventListener("click", this._openBurgerMenu);
    closeBtn.addEventListener("click", this._closeBurgerMenu);

    document.addEventListener("click", (event) => {
      if (
        burgerMenu.classList.contains("active") &&
        !burgerMenu.contains(event.target) &&
        event.target.closest(".button--menu") !== menuBtn
      ) {
        burgerMenu.classList.remove("active");
      }
    });

    nav.addEventListener("click", this._moveToAnchor.bind(this));

    window.addEventListener("resize", this._adjustZoom);
    window.addEventListener("load", this._adjustZoom);
  }

  _moveToAnchor(e) {
    e.preventDefault();

    const link = e.target.closest(".nav__menu-item");
    console.log(link);
    if (!link) return;

    if (burgerMenu.contains(link)) {
      this._closeBurgerMenu();
    }
    const targetSelector = link.querySelector("a").getAttribute("data-scroll");
    const target = document.querySelector(targetSelector);
    console.log(link);

    if (target) {
      const offSet = 100;
      const topPos =
        target.getBoundingClientRect().top + window.pageYOffset - offSet;

      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    }
  }

  timer(index, el) {
    setTimeout(() => {
      el.classList.toggle("active");

      if (index !== 1) {
        el.querySelector("svg").style.fill = "#83ff8f"; /* Vector */
      } else {
        el.querySelectorAll("path").forEach((path) => {
          path.style.stroke = "#83ff8f";
        });
      }

      setTimeout(() => {
        el.classList.toggle("active");
        if (index !== 1) {
          el.querySelector("svg").style.fill = "#E4E4E4"; /* Vector */
        } else {
          el.querySelectorAll("path").forEach((path) => {
            path.style.stroke = "#D9D9D9";
          });
        }
      }, 3000);
    }, index * 3000);
  }

  _featuresAnim() {
    features.forEach((el) => {
      const index = Array.from(features).indexOf(el);
      this.timer(index, el);
      setInterval(() => {
        this.timer(index, el);
      }, 12000);
    });
  }

  _openBurgerMenu() {
    burgerMenu.classList.add("active");
  }
  _closeBurgerMenu() {
    burgerMenu.classList.remove("active");
  }
}
const app = new App();
