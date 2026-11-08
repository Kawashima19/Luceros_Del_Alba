/*
  datos-personaje.js — Fuente única de datos de razas, clases y trasfondos.
  Lo usan las páginas de razas, trasfondos y creación (js/personaje.js).

  Para añadir una raza o un trasfondo, copia un objeto completo dentro de su lista.
  "origen" es el id del planeta donde nace la raza (planeta-1, planeta-2…);
  así aparece en la sección de razas nativas de esa ficha de planeta.

  Las razas tienen siempre estos seis rasgos, en este orden:
  Tamaño, Velocidad (solo en pies), Bonificadores, Visión en la oscuridad,
  Resistencias y Habilidades. Si una raza no tiene alguno, se escribe 0 o N/D.

  Cualquier ficha (raza, trasfondo o facción) puede llevar "imagen": la ruta
  de la ilustración desde la raíz del sitio (p. ej. "img/facciones/cazadores.svg").
  Si es null, la tarjeta no muestra imagen. Las facciones pueden añadir filas
  propias, como "Vestimenta".
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
        ["Velocidad", "30 pies"],
        ["Bonificadores", "0"],
        ["Visión en la oscuridad", "18 m"],
        ["Resistencias", "Fuego"],
        [
          "Habilidades",
          "Nervios explosivos: cada vez que el Tizón sufre daño o falla una salvación contra miedo, tira 1d6. Con un 6 explota: 2d6 de daño de fuego en 3 m (salvación de Destreza CD 12 para la mitad) y el Tizón cae a 0 PG.",
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
        ["Velocidad", "30 pies"],
        ["Bonificadores", "Fuerza +2, Constitución +1"],
        ["Visión en la oscuridad", "0"],
        ["Resistencias", "0"],
        [
          "Habilidades",
          "Ruido de fuelles: al estirar o encoger los brazos haces un ruido audible a 30 m; mientras lo haces, tienes desventaja en Sigilo. Golpe de fuelle: una vez por turno, al encoger el brazo para atacar, un impacto cuerpo a cuerpo causa 1d4 de daño de trueno adicional.",
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

  facciones: [
    {
      id: "cazadores",
      nombre: "Cazadores",
      icono: "◎",
      imagen: null, // p. ej. "img/facciones/cazadores.svg" cuando haya ilustración
      tipo: "Facción · Itinerante",
      descripcion:
        "Cazadores de oficio. Recorren los planetas en busca de seres a los que dar caza.",
      rasgos: [
        ["Actividad", "Caza de seres"],
        ["Ámbito", "Recorren los planetas"],
        ["Vestimenta", "N/D"],
        ["Líder", "N/D"],
      ],
    },
  ],
};
