/*
  menu.js — Cabecera y pie compartidos por todas las páginas.
  Para añadir una sección nueva, edita solo los arrays MENU y PIE.
  Cada página debe tener <div id="cabecera"></div>, <div id="pie"></div>
  y cargar este script al final del <body>.
*/

// Ruta base del sitio, calculada a partir de dónde está este script (js/menu.js).
// Así los enlaces funcionan igual desde la portada que desde una subcarpeta.
const BASE = document.currentScript.src.replace(/js\/menu\.js.*$/, "");

const MENU = [
  {
    titulo: "Mundo",
    enlaces: [
      ["Planetas", "mundo/planetas.html"],
      ["Facciones", "mundo/facciones.html"],
      ["Historia", "mundo/historia.html"],
    ],
  },
  {
    titulo: "Personaje",
    enlaces: [
      ["Crear personaje", "personaje/creacion.html"],
      ["Razas", "personaje/razas.html"],
      ["Clases", "personaje/clases.html"],
      ["Trasfondos", "personaje/trasfondos.html"],
    ],
  },
  {
    titulo: "Reglas",
    enlaces: [
      ["Reglas básicas", "reglas/basicas.html"],
      ["Coberturas", "reglas/coberturas.html"],
      ["Naves", "reglas/naves.html"],
    ],
  },
  {
    titulo: "Equipo",
    enlaces: [
      ["Armas", "equipo/armas.html"],
      ["Armaduras", "equipo/armaduras.html"],
      ["Objetos", "equipo/objetos.html"],
    ],
  },
];

const PIE = [
  ["Planetas", "mundo/planetas.html"],
  ["Razas", "personaje/razas.html"],
  ["Clases", "personaje/clases.html"],
  ["Crear personaje", "personaje/creacion.html"],
  ["Coberturas", "reglas/coberturas.html"],
  ["Naves", "reglas/naves.html"],
];

function crearCabecera() {
  const secciones = MENU.map(
    (s) => `
      <li class="menu__item">
        <button class="menu__boton" aria-expanded="false">${s.titulo}<span class="menu__flecha">▾</span></button>
        <ul class="desplegable">
          ${s.enlaces.map(([t, url]) => `<li><a href="${BASE + url}">${t}</a></li>`).join("")}
        </ul>
      </li>`
  ).join("");

  return `
    <header class="cabecera">
      <a class="logo" href="${BASE}index.html">
        <span class="logo__estrella">✦</span> Luceros del Alba
      </a>
      <button class="hamburguesa" aria-label="Abrir menú" aria-expanded="false">☰</button>
      <nav>
        <ul class="menu">${secciones}</ul>
      </nav>
    </header>`;
}

function crearPie() {
  const enlaces = PIE.map(([t, url]) => `<a href="${BASE + url}">${t}</a>`).join("");
  return `
    <footer class="pie">
      <nav class="pie__enlaces">${enlaces}</nav>
      <p class="pie__texto">Luceros del Alba · Campaña de D&amp;D 5e</p>
    </footer>`;
}

document.getElementById("cabecera").innerHTML = crearCabecera();
document.getElementById("pie").innerHTML = crearPie();

// Desplegables: se abren al pulsar (necesario en móvil; en escritorio también con el ratón por CSS).
const botones = document.querySelectorAll(".menu__boton");
botones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = boton.parentElement;
    const abierto = item.classList.contains("abierto");
    document.querySelectorAll(".menu__item.abierto").forEach((i) => {
      i.classList.remove("abierto");
      i.querySelector(".menu__boton").setAttribute("aria-expanded", "false");
    });
    if (!abierto) {
      item.classList.add("abierto");
      boton.setAttribute("aria-expanded", "true");
    }
  });
});

// Cerrar los desplegables al pulsar fuera.
document.addEventListener("click", () => {
  document.querySelectorAll(".menu__item.abierto").forEach((i) => i.classList.remove("abierto"));
});

// Menú hamburguesa en móvil.
const hamburguesa = document.querySelector(".hamburguesa");
hamburguesa.addEventListener("click", (e) => {
  e.stopPropagation();
  const menu = document.querySelector(".menu");
  const visible = menu.classList.toggle("visible");
  hamburguesa.setAttribute("aria-expanded", visible);
});
