// variables del dom
const contProductos = document.querySelector(".cont-productos");
const contCarrito = document.querySelector(".prod-carrito");

// obtener los productos de la db json
const obtenerProductos = async () => {
  const resp = await fetch("../db/productos.json");
  const data = await resp.json();
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
      <button id="${id}" class="btn-comprar">Comprar</button>
    `;
    contProductos.appendChild(div);
  });
  
  // funcional btn comprar
  const btnComprar = document.querySelectorAll(".btn-comprar");
  btnComprar.forEach((el) => {
    el.addEventListener(`click`, (e) => {
      agregarCarrito(productos, e.target.id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
};

// creando array de carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// agregar al carrito
function agregarCarrito(data, id) {
  const existe = carrito.some((prod) => prod.id === parseInt(id));
  if (existe) {
    carrito.forEach((prod) => {
      if (prod.id === parseInt(id)) {
        prod.cantidad++;
      }
    });
  } else {
    let prodEncontrado = data.find((prod) => prod.id === parseInt(id));
    carrito.push(prodEncontrado);
  }
  mostrarCarrito();
  calcularTotal();
  mostrartTotal();
}

// mostrar en carrito
function mostrarCarrito() {
  if (carrito.length >0) {
    contCarrito.innerHTML = ` `
    carrito.forEach((p) => {
      let nuevoProd = document.createElement("div");
      nuevoProd.classList.add("productos");
      nuevoProd.innerHTML = `
      <p>${p.nombre}</p>
      <p>${p.articulo}</p>
      <p id="cantidad-${p.id}">${p.cantidad}</p>
      <p>$${p.precio}</p>
      <button id="eliminar-${p.id}" data-id="${p.id}" class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>  
      `;
      contCarrito.appendChild(nuevoProd);

      const btnEliminar = document.querySelector(`#eliminar-${p.id}`);
      btnEliminar.addEventListener(`click`, eliminarProdCar);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    let div = document.createElement("div");
    div.classList.add("total");
    div.innerHTML = `
    <p id="total">$${total}</p>
    `;
    contCarrito.appendChild(div);
  } else {
    contCarrito.innerHTML = `
    <p class="vacio">El carrito esta vacio</p>
    `;
  }
}

// funcion eliminar
function eliminarProdCar(e) {
  const id = e.target.dataset.id;
  const index = carrito.findIndex((p) => p.id === parseInt(id));
  carrito.splice(index, 1);
  mostrarCarrito();
}

// totales
let total = 0;

const calcularTotal = () => {
  total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}

const mostrartTotal = () => {
  const totalElement = document.querySelector("#total");
  totalElement.textContent = `$${total}`;
};

mostrarCarrito();
