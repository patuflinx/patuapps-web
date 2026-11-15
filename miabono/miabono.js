/* Mi Abono · cinta de funciones y botón de contacto */
(function () {
  const items = [
    ["🎟️", "Quién va a cada partido"], ["⚖️", "Turnos por semana par o impar"], ["📅", "Calendario de la temporada"],
    ["🌦️", "Tiempo en el estadio"], ["🌧️", "Aviso si va a llover"], ["🔔", "Avisos del otro, no los tuyos"],
    ["💺", "Asientos en el plano"], ["✉️", "Solicitud de asistencia"], ["🏆", "El talismán de la temporada"],
    ["⚽️", "Goleadores y resultados"], ["📺", "Dónde lo televisan"], ["⏱️", "Marcador en directo"],
    ["🧩", "Widget"], ["🗣️", "«Oye Siri, ¿a quién le toca?»"], ["☁️", "Compartido por iCloud"],
    ["📄", "Exporta a PDF"], ["📸", "Resumen para compartir"], ["📖", "Manual dentro de la app"],
    ["🔐", "Lo privado, con Face ID"], ["🌗", "Modo oscuro"],
  ];
  document.querySelectorAll("[data-ribbon]").forEach((track) => {
    const half = Number(track.dataset.ribbon);
    const html = items.filter((_, i) => i % 2 === half)
      .map(([e, t]) => `<span class="chip-ill"><i>${e}</i>${t}</span>`).join("");
    track.innerHTML = html + html;
    track.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("[data-mail-btn]").forEach((a) => {
    a.href = "mailto:" + window.PATU.contactEmail + "?subject=" + encodeURIComponent("Mi Abono");
  });
})();
