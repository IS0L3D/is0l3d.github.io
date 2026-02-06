document.addEventListener("DOMContentLoaded", function () {
  const toggles = Array.from(document.querySelectorAll(".wp-drawer-toggle[data-target]"));
  const overlay = document.querySelector(".wp-drawer-overlay");
  const isMobile = window.matchMedia("(max-width: 800px)");

  if (!toggles.length || !overlay) return;

  const pairs = toggles
    .map(function (toggle) {
      const selector = toggle.getAttribute("data-target");
      const drawer = selector ? document.querySelector(selector) : null;
      return drawer ? { toggle: toggle, drawer: drawer } : null;
    })
    .filter(Boolean);

  if (!pairs.length) return;

  function closeAll() {
    pairs.forEach(function (pair) {
      pair.drawer.classList.remove("is-open");
      pair.toggle.setAttribute("aria-expanded", "false");
    });
    overlay.classList.remove("is-open");
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function openOne(pair) {
    if (!isMobile.matches) return;
    closeAll();
    pair.drawer.classList.add("is-open");
    pair.toggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  pairs.forEach(function (pair) {
    pair.toggle.addEventListener("click", function () {
      if (pair.drawer.classList.contains("is-open")) {
        closeAll();
      } else {
        openOne(pair);
      }
    });

    pair.drawer.addEventListener("click", function (event) {
      if (isMobile.matches && event.target.closest("a")) {
        closeAll();
      }
    });
  });

  overlay.addEventListener("click", closeAll);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAll();
  });

  isMobile.addEventListener("change", function () {
    if (!isMobile.matches) closeAll();
  });
});
