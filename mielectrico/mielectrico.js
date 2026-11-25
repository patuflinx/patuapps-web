/* Mi Eléctrico · cinta de funciones y botón de contacto */
(function () {
  const items = [
    ["🚿", "Limpiezas"], ["🛞", "Inflar ruedas"], ["💧", "Líquido limpiaparabrisas"],
    ["🔧", "Mantenimiento"], ["🛠️", "Reparaciones y revisiones"], ["📅", "Fecha, km y lugar"],
    ["💶", "Coste de cada cosa"], ["📷", "Fotos de facturas y tickets"], ["🔌", "Electricidad por meses"],
    ["⚡", "Consumo real del coche"], ["🧮", "Eficiencia de carga"], ["⛽", "Precio del combustible en España"],
    ["📊", "Coste total, mensual y medio"], ["🌀", "Rotación de neumáticos"], ["📏", "Dibujo de cada rueda"],
    ["✨", "Mejoras y accesorios"], ["🛡️", "Vencimientos del seguro"], ["🆘", "Botón de emergencia"],
    ["⬆️", "Exporta a CSV y JSON"], ["☁️", "Copia en iCloud Drive"], ["🌗", "Modo claro y oscuro"],
  ];
  document.querySelectorAll("[data-ribbon]").forEach((track) => {
    const half = Number(track.dataset.ribbon);
    const html = items.filter((_, i) => i % 2 === half)
      .map(([e, t]) => `<span class="chip-ill"><i>${e}</i>${t}</span>`).join("");
    track.innerHTML = html + html;
    track.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("[data-mail-btn]").forEach((a) => {
    a.href = "mailto:" + window.PATU.contactEmail + "?subject=" + encodeURIComponent("Mi Eléctrico");
  });
})();
