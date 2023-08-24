// variables del traidas del otro js
const carrito = JSON.parse(localStorage.getItem("carrito"));
const total = JSON.parse(localStorage.getItem("total"));
const contFinalizar = document.querySelector(".finalizar-prod");

//variable envio 
let precioEnvio = 0

// calcular total de productos
const totalProd = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

// funcion mostrar los detalles
const mostrarDetalles = (productos) => {
  productos.forEach((producto) => {
    const productostotales = document.querySelector("#prod");
    productostotales.textContent = `
  Productos(${carrito.length})
  `;
    const prodcutosValor = document.querySelector("#prod--edit");
    prodcutosValor.textContent = `
  $${total}
  `;

    const contador = document.querySelector("#contador");
    contador.textContent = `
  ${totalProd}
  `;

    // evento domicilio
    const btnDomi = document.querySelector("#domicilio");
    const envio = document.querySelector("#envio");
    btnDomi.addEventListener("click", (e) => {
      if (btnDomi.checked) {
        precioEnvio = 800;
        envio.textContent = `$${precioEnvio}`;
      }
    });

    // envento local
    const btnLocal = document.querySelector("#local");
    btnLocal.addEventListener("click", (e) => {
      if (btnLocal.checked) {
        precioEnvio = 0
        envio.textContent = `$${precioEnvio}`;
      }
    });

    // envento tarjeta
    const btnPago = document.querySelector("#pago");
    const totales = document.querySelector("#totales")
    btnPago.addEventListener('click', (e) =>{
      if (btnPago.checked){
        Swal.fire({
          title: '¿Estas seguro?',
          text: "Con tarjeta tenes un 10% de recargo",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#837e7eb1',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, acepto'
        }).then((result) => {
          if (result.isConfirmed) {
            let cuenta = total + ((total + precioEnvio)*10)/100;
            totales.textContent = `$${cuenta}`
          }
        })
      }
    })

    // evento efectivo
    const btnEfectivo = document.querySelector("#efectivo");
    btnEfectivo.addEventListener('click', (e) =>{
      let cuenta = total + precioEnvio;
      totales.textContent = `$${cuenta}`
    })
    
    // btn pagar 
    const btnPagar = document.querySelector(".fin");
    btnPagar.addEventListener('click', (e) =>{
      Swal.fire({
        title: '¿Confirma la compra?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, comprar'
      }).then((result) => {
        localStorage.clear("carrito");
        if (result.isConfirmed) {
          Swal.fire(
            'Felicidades',
            'Realizaste tu compra',
            'success'
            )
          }
      })
    })
  });
};

mostrarDetalles(carrito);

