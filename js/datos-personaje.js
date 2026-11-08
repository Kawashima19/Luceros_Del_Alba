/*
  datos-personaje.js — Fuente única de datos de razas, clases y trasfondos.
  Lo usan las páginas de razas, trasfondos y creación (js/personaje.js).

  Para añadir una raza o un trasfondo, copia un objeto completo dentro de su lista.
  Los rasgos son pares [nombre, descripción].
  "origen" es el id del planeta donde nace la raza (planeta-1, planeta-2…);
  así aparece en la sección de razas nativas de esa ficha de planeta.
*/

const DATOS = {
  razas: [
    {
      id: "tizon",
      nombre: "Tizón",
      origen: "planeta-1",
      icono: "✺",
      tipo: "Pequeño · Ígneo",
      descripcion:
        "Diablillos rojos del tamaño de un gato. Hablan deprisa, se mueven todavía más deprisa y, cuando se alteran, sueltan chispas.",
      rasgos: [
        ["Tamaño", "Pequeño"],
        ["Velocidad", "30 pies (9 m)"],
        ["Visión en la oscuridad", "18 m"],
        ["Resistencia", "Fuego"],
        [
          "Nervios explosivos",
          "Cada vez que el Tizón sufre daño o falla una salvación contra miedo, tira 1d6. Con un 6 explota: 2d6 de daño de fuego en 3 m (salvación de Destreza CD 12 para la mitad) y el Tizón cae a 0 PG.",
        ],
      ],
    },
    {
      id: "fuelle",
      nombre: "Fuelle",
      origen: "planeta-2",
      icono: "⚙",
      tipo: "Mediano · Robusto",
      descripcion:
        "Fortachones con fuelles de acordeón en los brazos. Cada vez que estiran o encogen un brazo, el aire suena con una nota grave.",
      rasgos: [
        ["Tamaño", "Mediano"],
        ["Velocidad", "30 pies (9 m)"],
        ["Bonificadores", "Fuerza +2, Constitución +1"],
        [
          "Ruido de fuelles",
          "Al estirar o encoger los brazos haces un ruido audible a 30 m. Mientras lo haces, tienes desventaja en Sigilo.",
        ],
        [
          "Golpe de fuelle",
          "Una vez por turno, al encoger el brazo para atacar, un impacto cuerpo a cuerpo causa 1d4 de daño de trueno adicional.",
        ],
      ],
    },
  ],

  clases: [
    "Salvaje",
    "Trovador",
    "Hierofante",
    "Simbionte",
    "Soldado",
    "Asceta",
    "Juramentado",
    "Rastreador",
    "Contrabandista",
    "Anómalo",
    "Vinculado",
    "Tecnomante",
  ],

  // Pendiente: las variantes de trasfondo aún no están definidas.
  trasfondos: [],
};
