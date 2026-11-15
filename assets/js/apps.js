/*
 * Catálogo de apps de PatuApps.
 * Para publicar una app nueva: añade una entrada aquí y crea su carpeta (p. ej. /miapp/index.html)
 * copiando /kebuy como plantilla. La portada y el pie de todas las páginas se generan con esta lista.
 */
window.PATU = {
  company: "PatuApps",
  // Cambia este correo por el de soporte real antes de publicar la web.
  contactEmail: "hola@patuapps.com",
  year: new Date().getFullYear(),
  apps: [
    {
      id: "kebuy",
      name: "KeBuy",
      tagline: "La lista de la compra que se comparte sola.",
      description:
        "Listas compartidas con tu familia, un dibujo para cada producto, buscador inteligente y en cuatro idiomas.",
      icon: "kebuy/img/kebuy-icon.png",
      url: "kebuy/",
      accent: "#2E8B3E",
      accentSoft: "#E3F2E5",
      platforms: ["iPhone"],
      status: "soon", // "soon" = Muy pronto · "live" = Disponible
      appStoreUrl: "", // pon aquí el enlace del App Store cuando esté publicada
    },
  ],
  // Huecos visibles en la portada para las próximas apps.
  upcoming: 2,
};
