/* KeMenjo · cinta de funciones y botón de contacto */
(function () {
  const items = [
    ["📷", "Escáner de códigos de barras"], ["🔎", "Buscador de productos"], ["🏷️", "Lee la etiqueta nutricional"],
    ["✍️", "Descríbelo con texto"], ["🍲", "Tus propias recetas"], ["🔥", "Te faltan N kcal"],
    ["💧", "Contador de agua"], ["🏃", "El ejercicio suma calorías"], ["⚖️", "Peso con tendencia"],
    ["🎯", "Peso objetivo saludable"], ["📊", "Semana y mes, comparados"], ["👟", "Pasos y entrenamientos"],
    ["🏆", "Ranking de alimentos"], ["🪄", "Completa el día con sugerencias"], ["🛒", "Tus supermercados primero"],
    ["✈️", "Base de datos sin conexión"], ["❤️", "Se guarda en Apple Salud"], ["👨‍👩‍👧", "Comparte en solo lectura"],
    ["🧩", "Widget de calorías"], ["🌗", "Modo oscuro y 8 colores"],
  ];
  document.querySelectorAll("[data-ribbon]").forEach((track) => {
    const half = Number(track.dataset.ribbon);
    const html = items.filter((_, i) => i % 2 === half)
      .map(([e, t]) => `<span class="chip-ill"><i>${e}</i>${t}</span>`).join("");
    track.innerHTML = html + html;
    track.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("[data-mail-btn]").forEach((a) => {
    a.href = "mailto:" + window.PATU.contactEmail + "?subject=" + encodeURIComponent("KeMenjo");
  });
})();
