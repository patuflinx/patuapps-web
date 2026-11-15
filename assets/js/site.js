/* PatuApps · cabecera, pie, catálogo de apps y animaciones comunes a todas las páginas. */
(function () {
  const P = window.PATU;
  const root = document.documentElement.dataset.root || "";
  const here = document.documentElement.dataset.app || "";
  const href = (p) => root + p;

  const mark = `
    <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF8A3D"/><stop offset="1" stop-color="#FF4F7B"/></linearGradient></defs>
      <rect width="64" height="64" rx="18" fill="url(#pg)"/>
      <circle cx="35" cy="28" r="12" fill="none" stroke="#fff" stroke-width="7"/>
      <path d="M23 28v22" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <circle cx="48" cy="48" r="4" fill="#FFE27A"/>
    </svg>`;

  // Cabecera
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const app = P.apps.find((a) => a.id === here);
    header.className = "site-header";
    header.innerHTML = `
      <div class="wrap">
        <a class="brand" href="${href("")}" aria-label="${P.company}, inicio">${mark}<span>${P.company}</span>${
          app ? `<small>/ ${app.name}</small>` : ""
        }</a>
        <nav class="nav" aria-label="Principal">
          ${header.dataset.links || ""}
          <a href="${href("#apps")}">Apps</a>
        </nav>
      </div>`;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Catálogo de apps
  const grid = document.querySelector("[data-app-grid]");
  if (grid) {
    const status = (a) => (a.status === "live" ? "Disponible" : "Muy pronto");
    grid.innerHTML =
      P.apps
        .map(
          (a) => `
      <a class="app-card reveal" href="${href(a.url)}" style="--app-accent:${a.accent}">
        <div class="glow"></div>
        <img class="app-icon" src="${href(a.icon)}" alt="" width="84" height="84">
        <span class="arrow" aria-hidden="true">→</span>
        <div><h3>${a.name}</h3><p style="margin-top:8px">${a.tagline}</p></div>
        <p>${a.description}</p>
        <div class="meta">${a.platforms.map((p) => `<span class="pill">${p}</span>`).join("")}<span class="pill accent">${status(a)}</span></div>
      </a>`
        )
        .join("") +
      Array.from({ length: P.upcoming })
        .map(
          (_, i) => `
      <div class="app-card placeholder reveal d${i + 1}" aria-label="Próxima app">
        <div class="q">?</div>
        <strong style="color:var(--ink-2)">Próxima app</strong>
        <p>Estamos cocinando algo nuevo.</p>
      </div>`
        )
        .join("");
  }

  // Pie
  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="wrap">
        <div class="cols">
          <div>
            <a class="brand" href="${href("")}">${mark}<span>${P.company}</span></a>
            <p style="margin-top:12px;max-width:22em">Apps pequeñas, cuidadas y respetuosas con tu privacidad.</p>
          </div>
          <div><h4>Apps</h4><ul>${P.apps.map((a) => `<li><a href="${href(a.url)}">${a.name}</a></li>`).join("")}</ul></div>
          <div><h4>Ayuda</h4><ul>${P.apps
            .map((a) => `<li><a href="${href(a.url + "soporte.html")}">Soporte de ${a.name}</a></li>`)
            .join("")}<li><a href="mailto:${P.contactEmail}">${P.contactEmail}</a></li></ul></div>
          <div><h4>Legal</h4><ul>${P.apps
            .map((a) => `<li><a href="${href(a.url + "privacidad.html")}">Privacidad de ${a.name}</a></li>`)
            .join("")}</ul></div>
        </div>
        <div class="bottom"><span>© ${P.year} ${P.company}</span><span>Hecho con cariño, una app cada vez</span></div>
      </div>`;
  }

  // Aparición al hacer scroll
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("in"));
})();
