# Web de PatuApps — guía para Claude

Web promocional de **PatuApps**, el estudio de apps de Christian. Presenta el estudio y cada una de sus apps.
KeBuy fue la primera. Llegarán más, y casi siempre se trabajará en esta web **desde el proyecto de otra app**.
Esta guía es para poder ampliarla sin contexto previo.

- Repositorio: https://github.com/patuflinx/patuapps-web (público, rama `main`). En este Mac, `gh` está en `~/.local/bin/gh` con sesión iniciada.
- Carpeta local: `~/Library/Mobile Documents/com~apple~CloudDocs/Claude/PatuApps-web`.
- Idioma de la web: español.
- Tecnología: HTML, CSS y JS estáticos. No hay dependencias, `npm` ni paso de compilación.
- Proyecto de KeBuy (la app): `../KeBuy`.

## Estructura

```
index.html              Portada: hero, catálogo de apps, valores y contacto
assets/css/site.css     Sistema de diseño común: tokens, modo oscuro, botones, marco de iPhone, tarjetas, cabecera, pie, páginas legales
assets/js/apps.js       Catálogo de apps (window.PATU) y correo de contacto  ← fuente única de datos
assets/js/site.js       Pinta cabecera, pie, catálogo y animaciones a partir de apps.js
assets/img/             Logo de PatuApps
<app>/                  Una carpeta por app (hoy: kebuy/)
  index.html            Página promocional
  privacidad.html       Política de privacidad (URL obligatoria en App Store Connect)
  soporte.html          Soporte (URL obligatoria en App Store Connect)
  <app>.css / <app>.js  Estilos y efectos propios de la app
  img/                  Icono, capturas reales (screens/) e ilustraciones (ill/)
```

Cada página indica en `<html>` dos atributos:
- `data-root`: ruta a la raíz, `""` en la portada y `"../"` dentro de una app.
- `data-app`: id de la app.

`site.js` usa los dos para construir los enlaces y marcar en la cabecera la app actual.
La cabecera y el pie se insertan en `<header data-site-header>` y `<footer data-site-footer>`.
`data-links` añade enlaces extra a la cabecera.

## Añadir una app nueva

1. **Reúne el material en el proyecto de la app.** Lee su código, README y changelog para conocer:
   - nombre, lema y funciones reales;
   - idiomas y plataformas;
   - qué datos recoge, para la política de privacidad;
   - su color de acento.
   Saca **capturas reales** en el simulador con `xcrun simctl io booted screenshot`.
   No inventes funciones ni hagas promesas que la app no cumpla.
2. **Crea la carpeta.** Copia `kebuy/` a `<id>/`, con el id en minúsculas y sin espacios. Después:
   - pon `data-app="<id>"` en todas sus páginas;
   - renombra `kebuy.css` y `kebuy.js` y cambia `--accent` y `--accent-soft` por los colores de la app;
   - rehaz los textos de `index.html` para la nueva app. Puedes conservar la estructura de secciones (hero con iPhones, cinta, bento de funciones, pasos, privacidad, FAQ, CTA y «Más apps») o adaptarla;
   - reescribe `privacidad.html` y `soporte.html` según lo que haga realmente la app;
   - sustituye el contenido de `img/` (icono de 1024 px, capturas en JPG y, si tiene, ilustraciones).
3. **Registra la app en `assets/js/apps.js`** con `id`, `name`, `tagline`, `description`, `icon`, `url`, `accent`, `accentSoft`, `platforms`, `status` (`"soon"` o `"live"`) y `appStoreUrl`.
   La app aparece sola en la portada, en el pie de todas las páginas y en «Más apps» de las demás.
   Baja `upcoming` en 1 para mostrar un hueco de «Próxima app» menos (mínimo 0).
4. **Pruébala** en local, en escritorio y en móvil (ver abajo).
5. **Publica.** Haz commit y `git push` a `main`.

Cuando una app salga en el App Store: pon `status: "live"` y su `appStoreUrl`. Los botones pasan a «Descárgala en el App Store».

## Estilo y reglas

- **Diseño:** muy visual y alegre, con fondos claros cálidos, esquinas muy redondeadas, ilustraciones y capturas dentro de marcos de iPhone. Respeta los tokens de `site.css` y no metas colores sueltos.
- **Colores:** el acento de PatuApps es naranja (`--accent: #ff6b3d`). Cada app redefine `--accent` en su CSS.
- **Tipografías:** Bricolage Grotesque para títulos y Figtree para el texto, ambas de Google Fonts.
- **Modo oscuro:** debe seguir funcionando.
- **Móvil:** sin scroll horizontal, con márgenes laterales de 16 px.
- **Animaciones:** respeta `prefers-reduced-motion`.
- **Recursos externos:** solo Google Fonts. Todo lo demás va dentro del repositorio.
- **Textos:** en español, cercanos, de tú y sin tecnicismos. Destaca lo bueno sin exagerar. En privacidad, describe solo lo que la app hace de verdad.
- **Contacto:** el correo sale de `PATU.contactEmail`. Nunca lo escribas a mano en el HTML.

## Probar en local

La carpeta está en iCloud Drive, y algunos servidores fallan al servirla directamente. Si pasa, copia primero a una carpeta temporal y sirve la copia:

```bash
python3 -m http.server 8765
```

Abre http://localhost:8765 y revisa el resultado a 1280 px y a 390 px de ancho.

## Pendiente

- `contactEmail` sigue siendo provisional (`hola@patuapps.com`) hasta tener un correo real.
- Falta alojamiento y dominio. La idea es GitHub Pages o Cloudflare Pages, publicando desde `main`.
  Con la web publicada:
  - URL de privacidad de cada app: `https://DOMINIO/<id>/privacidad.html`
  - URL de soporte: `https://DOMINIO/<id>/soporte.html`
