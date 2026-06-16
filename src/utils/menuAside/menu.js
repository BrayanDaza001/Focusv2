document.addEventListener("DOMContentLoaded", () => {
  const facturacion = document.getElementById("facturacion");
  const soporte = document.getElementById("soporte");
  const cordinador = document.getElementById("btn_cordinador");

  const menuFacturacion = document.getElementById("menuFacturacion");
  const menuSoporte = document.getElementById("menuSoporte");
  const menuCoordinador = document.getElementById("menuCoordinador");

  const menuStart = document.getElementById("menu_start");
  const btnAtras = document.getElementById("btn-atras");

  if (
    !facturacion ||
    !soporte ||
    !cordinador ||
    !menuFacturacion ||
    !menuSoporte ||
    !menuCoordinador ||
    !menuStart ||
    !btnAtras
  ) {
    return;
  }

  const resetMenu = () => {
    [menuFacturacion, menuSoporte, menuCoordinador].forEach((menu) => {
      menu.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-5",
        "absolute"
      );
    });

    menuStart.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "hidden",
      "absolute"
    );

    btnAtras.classList.add(
      "opacity-0",
      "pointer-events-none",
      "absolute"
    );
  };

  const openSection = (menu) => {
    resetMenu();

    menu.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "-translate-y-5",
      "absolute"
    );

    menuStart.classList.add(
      "opacity-0",
      "pointer-events-none",
      "hidden"
    );

    btnAtras.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "absolute"
    );
  };

  facturacion.addEventListener("click", () => openSection(menuFacturacion));
  soporte.addEventListener("click", () => openSection(menuSoporte));
  cordinador.addEventListener("click", () => openSection(menuCoordinador));
  btnAtras.addEventListener("click", resetMenu);
});

