/*
  personaje.js — Renderiza las listas de razas y trasfondos y el creador de personaje.
  Los datos vienen de DATOS (js/datos-personaje.js). Cada página solo necesita
  un contenedor con el id correspondiente:
    #razas-lista · #trasfondos-lista · #creador
*/

const CLAVE_PERSONAJE = "luceros-personaje";

// Escapa texto de los datos antes de meterlo en el HTML.
function escapar(texto) {
  const d = document.createElement("div");
  d.textContent = String(texto);
  return d.innerHTML;
}

// Tarjeta común para razas y trasfondos.
function tarjetaDeDatos(item) {
  return `
    <article class="objeto">
      <div class="objeto__cabecera">
        <span class="objeto__icono">${escapar(item.icono)}</span>
        <div>
          <h2>${escapar(item.nombre)}</h2>
          <p class="objeto__tipo">${escapar(item.tipo)}</p>
        </div>
      </div>
      <p class="objeto__desc">${escapar(item.descripcion)}</p>
      <dl class="objeto__datos">
        ${item.rasgos.map(([t, d]) => `<div><dt>${escapar(t)}</dt><dd>${escapar(d)}</dd></div>`).join("")}
      </dl>
    </article>`;
}

function renderLista(contenedor, items, mensajeVacio) {
  if (!items.length) {
    contenedor.innerHTML = `<p class="intro-equipo">${escapar(mensajeVacio)}</p>`;
    return;
  }
  contenedor.innerHTML = items.map(tarjetaDeDatos).join("");
}

// ---------- Almacenamiento local (con protección por si el navegador lo bloquea) ----------

function leerPersonaje() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PERSONAJE)) || {};
  } catch (e) {
    return {};
  }
}

function guardarPersonaje(datos) {
  try {
    localStorage.setItem(CLAVE_PERSONAJE, JSON.stringify(datos));
  } catch (e) {
    /* Sin almacenamiento disponible: la hoja sigue funcionando, solo no se guarda. */
  }
}

function borrarPersonaje() {
  try {
    localStorage.removeItem(CLAVE_PERSONAJE);
  } catch (e) {}
}

// ---------- Creador de personaje ----------

function opciones(pares) {
  return pares.map(([valor, texto]) => `<option value="${escapar(valor)}">${escapar(texto)}</option>`).join("");
}

function iniciarCreador(contenedor) {
  contenedor.innerHTML = `
    <form class="creador__form" autocomplete="off">
      <label>Nombre
        <input name="nombre" maxlength="40" placeholder="Cómo se llama tu personaje">
      </label>
      <label>Raza
        <select name="raza">
          <option value="">Elige una raza</option>
          ${opciones(DATOS.razas.map((r) => [r.id, r.nombre]))}
        </select>
      </label>
      <label>Clase
        <select name="clase">
          <option value="">Elige una clase</option>
          ${opciones(DATOS.clases.map((c) => [c, c]))}
        </select>
      </label>
      <label>Trasfondo
        <select name="trasfondo">
          <option value="">${DATOS.trasfondos.length ? "Elige un trasfondo" : "Por definir"}</option>
          ${opciones(DATOS.trasfondos.map((t) => [t.id, t.nombre]))}
        </select>
      </label>
    </form>

    <article class="hoja" aria-live="polite"></article>

    <div class="creador__acciones">
      <button type="button" class="boton boton--primario" data-accion="imprimir">Imprimir hoja</button>
      <button type="button" class="boton" data-accion="borrar">Empezar de nuevo</button>
    </div>
    <p class="hoja__nota">Tu hoja se guarda en este navegador. Pendiente de añadir: atributos, puntos de golpe y equipo.</p>`;

  const form = contenedor.querySelector("form");
  const hoja = contenedor.querySelector(".hoja");
  const campos = form.elements;

  // Rellena el formulario con lo guardado
  const guardado = leerPersonaje();
  ["nombre", "raza", "clase", "trasfondo"].forEach((c) => {
    if (guardado[c] !== undefined) campos[c].value = guardado[c];
  });

  function dibujarHoja() {
    const raza = DATOS.razas.find((r) => r.id === campos.raza.value);
    const trasfondo = DATOS.trasfondos.find((t) => t.id === campos.trasfondo.value);
    const clase = campos.clase.value;

    const filaDato = (t, d) => `<div><dt>${escapar(t)}</dt><dd>${escapar(d || "Sin elegir")}</dd></div>`;

    hoja.innerHTML = `
      <h2>${escapar(campos.nombre.value.trim() || "Sin nombre")}</h2>
      <dl>
        ${filaDato("Raza", raza && raza.nombre)}
        ${filaDato("Clase", clase)}
        ${filaDato("Trasfondo", trasfondo && trasfondo.nombre)}
      </dl>
      ${raza ? `<h3>Rasgos de ${escapar(raza.nombre)}</h3><dl>${raza.rasgos.map(([t, d]) => filaDato(t, d)).join("")}</dl>` : ""}
      ${trasfondo ? `<h3>Trasfondo</h3><p>${escapar(trasfondo.descripcion)}</p>` : ""}`;
  }

  form.addEventListener("input", () => {
    guardarPersonaje({
      nombre: campos.nombre.value,
      raza: campos.raza.value,
      clase: campos.clase.value,
      trasfondo: campos.trasfondo.value,
    });
    dibujarHoja();
  });

  contenedor.querySelector('[data-accion="imprimir"]').addEventListener("click", () => window.print());

  contenedor.querySelector('[data-accion="borrar"]').addEventListener("click", () => {
    if (!window.confirm("¿Empezar de nuevo? Se borrará la hoja guardada en este navegador.")) return;
    borrarPersonaje();
    form.reset();
    dibujarHoja();
  });

  dibujarHoja();
}

// ---------- Arranque según la página ----------

const razasLista = document.getElementById("razas-lista");
if (razasLista) renderLista(razasLista, DATOS.razas, "Aún no hay razas definidas.");

const trasfondosLista = document.getElementById("trasfondos-lista");
if (trasfondosLista) renderLista(trasfondosLista, DATOS.trasfondos, "Por definir: los trasfondos aún no están escritos.");

const creador = document.getElementById("creador");
if (creador) iniciarCreador(creador);

// Razas nativas de cada planeta: <div data-razas-origen="planeta-1"></div>
document.querySelectorAll("[data-razas-origen]").forEach((bloque) => {
  const nativas = DATOS.razas.filter((r) => r.origen === bloque.dataset.razasOrigen);
  bloque.innerHTML = `
    <h3 class="razas-planeta__titulo">Razas nativas</h3>
    ${nativas.length
      ? `<div class="rejilla-objetos">${nativas.map(tarjetaDeDatos).join("")}</div>`
      : `<p class="intro-equipo">Ninguna raza jugable nativa de este planeta todavía.</p>`}`;
});
