export interface Accesorio {
  imagen: string;
  nombre: string;
  categoria: string;
  stock: number;
}

export const accesorios: Accesorio[] = [
  {
    imagen: "mouse",
    nombre: "Mouse Óptico Logitech",
    categoria: "Periféricos",
    stock: 42,
  },
  {
    imagen: "keyboard",
    nombre: "Teclado Mecánico Redragon",
    categoria: "Periféricos",
    stock: 15,
  },
  {
    imagen: "plug",
    nombre: "Cargador Laptop Universal",
    categoria: "Energia",
    stock: 5,
  },
  {
    imagen: "monitor",
    nombre: "Monitor 24 UltraWide",
    categoria: "Pantallas",
    stock: 2,
  },
  {
    imagen: "headphones",
    nombre: "Audífonos Sony WH-1000XM4",
    categoria: "Audio",
    stock: 12,
  },
  {
    imagen: "printer",
    nombre: "Impresora Epson L3250",
    categoria: "Oficina",
    stock: 8,
  },
];
