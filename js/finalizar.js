// variables del traidas del otro js
const carrito = JSON.parse(localStorage.getItem('carrito'));
const total = JSON.parse(localStorage.getItem('total'));
const contFinalizar = document.querySelector(".finalizar-prod");

// calcular total de productos
const totalProd = carrito.reduce((acc, prod) => acc + prod.cantidad,0) 

// funcion mostrar los detalles
const mostrarProductos = (productos) =>{
productos.forEach(producto => {
  let div = document.createElement("div");
  div.classList.add("prod-edit");
  div.innerHTML = ` 
  <p>Productos(${carrito.length})</p>
  <p>$${total}</p>
  `
  div.appendChild(contFinalizar)

  let div2 = document.createElement("div");
  div.classList.add("prod-edit");
  div.innerHTML = ` 
  <p>Cantidad</p>
  <p>$${totalProd}</p>
  `
  div2.appendChild(contFinalizar)

  let div3 = document.createElement("div");
  div.classList.add("prod-edit");
  div.innerHTML = ` 
  <p>Envio</p>
  <p>-</p>
  `
  div3.appendChild(contFinalizar)

  let div4 = document.createElement("div");
  div.classList.add("prod-edit");
  div.innerHTML = ` 
  <h5>Pagas</h5>
  <p>$${total}</p>
  `
  div4.appendChild(contFinalizar)
});
}

mostrarProductos(carrito);




// funcion para verificar los radio buttons
// function verificarRb (){
//   if (document.getElementById('domicilio').checked){
//     const domicilio = "Eligio entrega a domicilio"
//   }
  
//   if (document.getElementById('local').checked){
//     const local = "Eligio retiro en el local";
//   }
//   if (document.getElementById('pago').checked){
//     const tarjeta = "Eligio pagar con tarjeta de credito o debito";
//   }
//   if (document.getElementById('efectivo').checked){
//     const efectivo = "Eligio pagar en efectivo";
//   }
// }

// // btn pagar
// const btnPagar = document.querySelector(".fin");
// btnPagar.addEventListener('click', (e) => verificarRb());

