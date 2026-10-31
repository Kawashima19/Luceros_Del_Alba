# Luceros del Alba

Wiki de una campaña de D&D 5e de ciencia ficción espacial: ambientación, planetas, creación de personajes, clases y reglas propias de coberturas y naves. Hecha en HTML y publicada con GitHub Pages.

## Estructura

```
index.html        Portada
css/estilo.css    Estilo común de todas las páginas
js/menu.js        Cabecera (con desplegables) y pie compartidos
mundo/            Planetas, facciones, historia
personaje/        Creación, razas, clases, trasfondos
reglas/           Básicas, coberturas, naves
equipo/           Armas, armaduras, objetos
```

## Añadir una página nueva

1. Copia la estructura de `index.html` (deja `<div id="cabecera">`, `<div id="pie">` y el script `js/menu.js`).
2. Desde una subcarpeta, enlaza el CSS y el JS con `../`: `../css/estilo.css` y `../js/menu.js`.
3. Para que aparezca en el menú o en el pie, añádela en los arrays `MENU` o `PIE` de `js/menu.js`.

Nombres de archivo en minúsculas, sin tildes ni espacios.
