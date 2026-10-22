// Marks the menu link for the page shown in the content frame with
// aria-current, and keeps it in sync as the visitor browses, including links
// inside the page and the browser's back button.
const menu = document.querySelector(".menu");
const links = [...menu.querySelectorAll("a")];

function markCurrent(link) {
  links.forEach((other) => other.removeAttribute("aria-current"));
  link.setAttribute("aria-current", "page");

  // In the compact (phone) menu the links scroll sideways, so make sure the
  // current one is visible. scrollIntoView() is avoided because it can also
  // scroll the parent page.
  menu.scrollLeft = link.offsetLeft - (menu.clientWidth - link.offsetWidth) / 2;
}

function syncWithContentFrame(frame) {
  // Pages without a menu link (like under-construction.html) keep the old mark
  const link = links.find((l) => l.href === frame.contentWindow.location.href);
  if (link) markCurrent(link);
}

links.forEach((link) => {
  link.addEventListener("click", () => markCurrent(link));
});

try {
  const frame = window.parent.document.querySelector('iframe[name="main"]');
  frame.addEventListener("load", () => syncWithContentFrame(frame));
  syncWithContentFrame(frame);
} catch {
  // Opened on its own, or from file:// where frames can't see each other.
  // The click handlers above still work.
}
