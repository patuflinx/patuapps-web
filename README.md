# Web de PatuApps

Web estática (HTML, CSS y JS sin dependencias). Se puede subir tal cual a cualquier alojamiento estático: GitHub Pages, Netlify, Cloudflare Pages o el hosting del dominio.

## Estructura

```
index.html              Portada de PatuApps (catálogo de apps)
assets/css/site.css     Sistema de diseño común (colores, botones, marco de iPhone, cabecera, pie…)
assets/js/apps.js       Catálogo de apps y correo de contacto  ← lo que más se edita
assets/js/site.js       Cabecera, pie, tarjetas de apps y animaciones
assets/img/             Logo de PatuApps
kebuy/                  Página de KeBuy
  index.html            Página promocional
  privacidad.html       Política de privacidad (URL para App Store Connect)
  soporte.html          Soporte (URL para App Store Connect)
  kebuy.css / kebuy.js  Estilos y efectos propios de KeBuy
  img/                  Icono, capturas reales de la app e ilustraciones
```

## Antes de publicar

1. En `assets/js/apps.js`, cambia `contactEmail` por el correo de soporte real.
2. Cuando KeBuy esté en el App Store, pon su enlace en `appStoreUrl` y cambia `status` a `"live"`. Los botones pasarán a «Descárgala en el App Store».
3. En App Store Connect usa:
   - URL de privacidad: `https://TU-DOMINIO/kebuy/privacidad.html`
   - URL de soporte: `https://TU-DOMINIO/kebuy/soporte.html`

## Añadir una app nueva

1. Copia la carpeta `kebuy/` con el nombre de la app (por ejemplo `miapp/`) y cambia textos, capturas e icono.
2. En `miapp/index.html`, pon `data-app="miapp"` en la etiqueta `<html>`.
3. En `miapp/*.css`, cambia `--accent` por el color de la app.
4. Añade su entrada en `assets/js/apps.js`. Aparecerá sola en la portada, en el pie de todas las páginas y en «Más apps» de las demás.
5. Reduce `upcoming` en `apps.js` si quieres mostrar menos huecos de «Próxima app».

## Probar en local

```bash
python3 -m http.server 8765
```

Luego abre http://localhost:8765.
