// variables del dom
const contProductos = document.querySelector(".cont-productos");
const contCarrito = document.querySelector(".prod-carrito");

let productos = [];

// obtener los productos de la db json
const obtenerProductos = async () => {
  const resp = await fetch("../db/productos.json");
  productos = await resp.json();
  mostrarProductos(productos);
};

obtenerProductos();

// mostrar productos de la db json
const mostrarProductos = (productos) => {
  contProductos.innerHTML = ` `;
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
      Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right,#3b3a3a, #35dab7)",
        },
      }).showToast();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
};

// mostrar filtros
const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const categoria = e.target.id;
    if (categoria === "btn-todos") {
      mostrarProductos(productos);
    } else if (categoria === "precio") {
      const productosFiltrados = [...productos];
      ordenarProductosPorPrecio(productosFiltrados);
      mostrarProductos(productosFiltrados);
    } else {
      const productosFiltrados = filtrarProductosPorCategoria(categoria);
      mostrarProductos(productosFiltrados);
    }
  });
});

// Función para filtrar productos por categoría
const filtrarProductosPorCategoria = (categoria) => {
  return productos.filter((producto) => producto.articulo === categoria);
};

// Función para ordenar productos por precio de menor a mayor
const ordenarProductosPorPrecio = (productos) => {
  productos.sort((a, b) => a.precio - b.precio);
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
        contadorProd++;
      }
    });
  } else {
    let prodEncontrado = data.find((prod) => prod.id === parseInt(id));
    carrito.push(prodEncontrado);
    contadorProd++;
  }
  mostrarCarrito();
  calcularTotal();
  mostrarTotal();
}

// mostrar en carrito
function mostrarCarrito() {
  if (carrito.length > 0) {
    contCarrito.innerHTML = ` `;
    carrito.forEach((p) => {
      let nuevoProd = document.createElement("div");
      nuevoProd.classList.add("productos");
      nuevoProd.innerHTML = `
      <p class="carrito-nom">${p.nombre}</p>
      <p class="carrito-art">${p.articulo}</p>
      <p class="carrito-cant" id="cantidad-${p.id}">${p.cantidad}</p>
      <p class="carrito-pr">$${p.precio}</p>
      <button id="eliminar-${p.id}" data-id="${p.id}" class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>  
      `;
      contCarrito.appendChild(nuevoProd);

      const btnEliminar = document.querySelector(`#eliminar-${p.id}`);
      btnEliminar.addEventListener(`click`, () => eliminarProdCar(p.id));
    });

    let contDiv = document.createElement("div");
    contDiv.classList.add("cont-buttons");
    contCarrito.appendChild(contDiv);

    //div de total
    let div = document.createElement("div");
    div.classList.add("total");
    div.innerHTML = `
    <p id="total">$${total}</p>
    `;
    contDiv.appendChild(div);

    // div finalizar compra
    let btnFinalizar = document.createElement("div");
    btnFinalizar.classList.add("finalizar");
    btnFinalizar.innerHTML = `
    <a href="pages/finalizarcarrito.html">Finalizar compra</a>
    `;
    contDiv.appendChild(btnFinalizar);
  } else {
    contCarrito.innerHTML = `
    <p class="vacio">El carrito esta vacio!!</p>
    `;
  }
}

// funcion eliminar
function eliminarProdCar(id) {
  const producto = carrito.find((prod) => prod.id === parseInt(id));

  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      contadorProd--;
      Toastify({
        text: "Eliminado",
        duration: 1000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #35dab7, #3b3a3a)",
        },
        onClick: function () {},
      }).showToast();
    } else {
      const index = carrito.findIndex((p) => p.id === parseInt(id));
      Swal.fire({
        title: "¿Estas seguro?",
        text: `Borrarás un producto`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Borrado!", "Lo has borrado.", "success");
          carrito.splice(index, 1);
          contadorProd--;
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        calcularTotal();
        mostrarTotal();
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
    mostrarTotal();
  }
}

// totales
let total = 0;

const calcularTotal = () => {
  total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
};

const mostrarTotal = () => {
  const totalElement = document.querySelector("#total");
  totalElement.textContent = `$${total}`;
};

mostrarCarrito();

// contador de productos
let contadorProd = 0;

const prodTotales = document.querySelector("#prod-totales");
prodTotales.innerHTML = `${contadorProd}`;

