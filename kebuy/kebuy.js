/* KeBuy · cinta de productos, mosaico de ilustraciones y selector de idiomas */
(function () {
  const products = [
    ["apple", "Manzanas"], ["banana", "Plátanos"], ["strawberry", "Fresas"], ["avocado", "Aguacates"],
    ["tomato", "Tomates"], ["carrot", "Zanahorias"], ["lettuce", "Lechuga"], ["onion", "Cebollas"],
    ["mushroom", "Champiñones"], ["milk", "Leche"], ["cheese", "Queso"], ["eggs", "Huevos"],
    ["bread", "Pan"], ["croissant", "Cruasanes"], ["cake", "Tarta"], ["pasta", "Pasta"],
    ["rice", "Arroz"], ["oil", "Aceite"], ["coffee", "Café"], ["tea", "Té"],
    ["water", "Agua"], ["juice", "Zumo"], ["wine", "Vino"], ["beer", "Cerveza"],
    ["fish", "Pescado"], ["shrimp", "Gambas"], ["sushi", "Sushi"], ["chicken", "Pollo"],
    ["pizza", "Pizza"], ["icecream", "Helado"], ["chocolate", "Chocolate"], ["cookies", "Galletas"],
    ["cereal", "Cereales"], ["yogurt", "Yogures"], ["lemon", "Limones"], ["grapes", "Uvas"],
    ["orange", "Naranjas"], ["pepper", "Pimientos"], ["potato", "Patatas"], ["toiletpaper", "Papel higiénico"],
    ["detergent", "Detergente"], ["shampoo", "Champú"], ["toothpaste", "Pasta de dientes"], ["petfood", "Pienso"],
    ["plant", "Plantas"], ["battery", "Pilas"], ["bulb", "Bombillas"], ["sponge", "Estropajos"],
  ];

  // Cinta: dos filas en direcciones opuestas (el contenido se duplica para el bucle infinito).
  document.querySelectorAll("[data-ribbon]").forEach((track) => {
    const half = Number(track.dataset.ribbon);
    const list = products.filter((_, i) => i % 2 === half);
    const html = list.map(([ill, name]) => `<span class="chip-ill"><img src="img/ill/${ill}.svg" alt="" loading="lazy">${name}</span>`).join("");
    track.innerHTML = html + html;
    track.setAttribute("aria-hidden", "true");
  });

  // Mosaico de ilustraciones
  const grid = document.querySelector("[data-ill-grid]");
  if (grid) {
    grid.innerHTML = ["apple", "milk", "bread", "cheese", "carrot", "fish", "pizza", "coffee", "eggs", "wine", "detergent", "petfood"]
      .map((i) => `<span><img src="img/ill/${i}.svg" alt="" loading="lazy"></span>`)
      .join("");
  }

  // Selector de idiomas
  const langs = {
    es: { img: "list.jpg", word: "Plátanos", bubble: "Plátanos · De Canarias", alt: "La lista Compra semanal en español" },
    ca: { img: "list-ca.jpg", word: "Plàtans", bubble: "Plàtans · De Canàries", alt: "La llista Compra semanal en català" },
    en: { img: "list-en.jpg", word: "Bananas", bubble: "Bananas · From the Canary Islands", alt: "The Compra semanal list in English" },
    zh: { img: "list-zh.jpg", word: "香蕉", bubble: "香蕉 · 加那利产", alt: "中文版的 Compra semanal 清单" },
  };
  const order = ["es", "ca", "en", "zh"];
  const img = document.querySelector("[data-lang-img]");
  const bubble = document.querySelector("[data-bubble]");
  const word = document.querySelector("[data-swap]");
  const tabs = document.querySelectorAll("[data-lang]");
  let current = "es";
  let timer;

  // Precarga para que el cambio sea instantáneo.
  order.forEach((k) => { const i = new Image(); i.src = "img/screens/" + langs[k].img; });

  function show(key) {
    if (key === current) return;
    current = key;
    const l = langs[key];
    tabs.forEach((t) => { const on = t.dataset.lang === key; t.classList.toggle("on", on); t.setAttribute("aria-selected", on); });
    img.classList.add("fade");
    word.classList.add("out");
    setTimeout(() => {
      img.src = "img/screens/" + l.img;
      img.alt = l.alt;
      bubble.textContent = l.bubble;
      word.textContent = l.word;
      img.classList.remove("fade");
      word.classList.remove("out");
    }, 300);
  }

  tabs.forEach((t) => t.addEventListener("click", () => { clearInterval(timer); show(t.dataset.lang); }));

  // Rotación automática mientras la sección está a la vista (se detiene al tocar un idioma).
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const section = document.getElementById("idiomas");
  if (!reduce && section && "IntersectionObserver" in window) {
    let started = false;
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          timer = setInterval(() => show(order[(order.indexOf(current) + 1) % order.length]), 2600);
        }
      });
    }, { threshold: 0.4 }).observe(section);
  }

  // Enlace del App Store cuando la app esté publicada.
  const app = (window.PATU?.apps || []).find((a) => a.id === "kebuy");
  if (app?.appStoreUrl) {
    document.querySelectorAll(".store-badge").forEach((b) => {
      b.href = app.appStoreUrl;
      b.querySelector("small").textContent = "Descárgala en el";
    });
  }
})();
