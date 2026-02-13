document.addEventListener("DOMContentLoaded", function () {
  const blocks = Array.from(document.querySelectorAll("pre code"));
  if (!blocks.length) return;

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "absolute";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        if (ok) resolve();
        else reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      }
    });
  }

  blocks.forEach(function (code) {
    const pre = code.closest("pre");
    if (!pre || pre.querySelector(".code-copy-btn")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-btn";
    button.setAttribute("aria-label", "Copiar codigo");
    button.setAttribute("data-label", "Copiar");
    button.innerHTML =
      '<svg class="code-copy-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="9" y="9" width="11" height="11" rx="2" ry="2"></rect>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      "</svg>";

    button.addEventListener("click", function () {
      const original = button.getAttribute("data-label") || "Copiar";
      copyText(code.innerText)
        .then(function () {
          button.classList.add("is-copied");
          button.setAttribute("data-label", "Copiado");
          setTimeout(function () {
            button.classList.remove("is-copied");
            button.setAttribute("data-label", original);
          }, 1200);
        })
        .catch(function () {
          button.setAttribute("data-label", "Error");
          setTimeout(function () {
            button.setAttribute("data-label", original);
          }, 1200);
        });
    });

    pre.appendChild(button);
  });
});
