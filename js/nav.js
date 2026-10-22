// Moves the "current page" marker to whichever menu link was clicked, since
// the menu frame itself never reloads.
const menu = document.querySelector(".menu");
const links = menu.querySelectorAll("a");

function showCurrent() {
  // In the compact (mobile) menu the links scroll sideways, so make sure the
  // current one is visible. scrollIntoView() is avoided because it can also
  // scroll the parent page.
  const current = menu.querySelector('[aria-current="page"]');
  menu.scrollLeft =
    current.offsetLeft - (menu.clientWidth - current.offsetWidth) / 2;
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((other) => other.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    showCurrent();
  });
});

showCurrent();
