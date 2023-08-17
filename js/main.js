// variables del dom
const contProductos = document.querySelector(".cont-productos");


// obtener los productos de la db json
const obtenerProductos = async () => {
  const resp = await fetch("../db/productos.json");
  const data = await resp.json();
  console.log(data);
  mostrarProductos(data);
};

obtenerProductos();


// mostrar productos de la db json
const mostrarProductos = (productos) => {
  productos.forEach((producto) => {
    const { img, nombre, id, precio } = producto;
    let div = document.createElement("div");
    div.classList.add("card-product");
    div.innerHTML = `
      <h4>${nombre}</h4>
      <img src=${img} alt="">
      <p>$${precio}</p>
      <button id="${id}">comprar</button>
    `;
    contProductos.appendChild(div);
  });
};
