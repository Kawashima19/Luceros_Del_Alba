/*
  carrusel.js — Muestra un elemento cada vez dentro de .carrusel,
  con flechas, puntos indicadores, teclado (← →) y deslizar en móvil.
  Cada diapositiva es un hijo directo de .carrusel__pista.
*/

document.querySelectorAll(".carrusel").forEach((carrusel) => {
  const diapositivas = Array.from(carrusel.querySelector(".carrusel__pista").children);
  const contenedorPuntos = carrusel.querySelector(".carrusel__puntos");
  let actual = 0;

  // Un punto por diapositiva
  const puntos = diapositivas.map((d, i) => {
    const punto = document.createElement("button");
    punto.className = "carrusel__punto";
    punto.setAttribute("aria-label", d.querySelector("h2")?.textContent || `Elemento ${i + 1}`);
    punto.addEventListener("click", () => mostrar(i));
    contenedorPuntos.appendChild(punto);
    return punto;
  });

  function mostrar(i, direccion = 1, cambiarUrl = true) {
    actual = (i + diapositivas.length) % diapositivas.length; // da la vuelta al llegar al final
    diapositivas.forEach((d, j) => {
      d.classList.toggle("activo", j === actual);
      d.classList.toggle("desde-izq", j === actual && direccion < 0);
    });
    puntos.forEach((p, j) => p.classList.toggle("activo", j === actual));
    if (cambiarUrl) try { history.replaceState(null, "", "#" + diapositivas[actual].id); } catch (e) {} // permite enlazar a un planeta concreto
  }

  carrusel.querySelector(".flecha--izq").addEventListener("click", () => mostrar(actual - 1, -1));
  carrusel.querySelector(".flecha--der").addEventListener("click", () => mostrar(actual + 1, 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(actual - 1, -1);
    if (e.key === "ArrowRight") mostrar(actual + 1, 1);
  });

  // Deslizar con el dedo
  let inicioX = null;
  carrusel.addEventListener("touchstart", (e) => (inicioX = e.touches[0].clientX), { passive: true });
  carrusel.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const distancia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 50) distancia < 0 ? mostrar(actual + 1, 1) : mostrar(actual - 1, -1);
    inicioX = null;
  });

  // Si la URL trae #planeta-2, empieza en ese
  const inicial = diapositivas.findIndex((d) => "#" + d.id === location.hash);
  mostrar(inicial >= 0 ? inicial : 0, 1, false);
});
