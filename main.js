const menuContent = document.getElementById("menuContent")
const verCarrito = document.getElementById("carrito")
const modalContainer = document.getElementById("modal-container")
const contarCarrito = document.getElementById("verCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []


  
const getPizzas = async() => {
   try{
    const response = await fetch("data.json");
    const pizzas = await response.json();
    return pizzas;
    } catch (error){
      console.error(error);
}
} 

getPizzas().then((pizzas) => {
    pizzas.forEach((pizza) => {
    let menu = document.createElement("div")
    menu.className="card"
    menu.innerHTML = `
    <img src="${pizza.img}"></img>
    <h3> ${pizza.tipo}</h3>
    <p class="precio"> $ ${pizza.precio}
    `;

     menuContent.append(menu)  

    let comprar = document.createElement("button")
    comprar.innerText= "Comprar";
    comprar.className= "comprar";

    menu.append(comprar);

    comprar.addEventListener("click", () => {
        const repetido = carrito.some((pizzaRepetida) => pizzaRepetida.id === pizza.id)
        if (repetido){
            carrito.map((pizz)=> {
                if(pizz.id === pizza.id){
                    pizz.cantidad++;
                }
            });

        } else {
        carrito.push({
            id: pizza.id,
            img: pizza.img,
            nombre: pizza.tipo,
            precio: pizza.precio,
            cantidad: pizza.cantidad,
            

        })};
        carritoCounter();
        guardarData();
        })
    });
});


    funcionesCarrito = ()=>{
    modalContainer.innerHTML="";
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML= `
    <h1 class="modal-header-title">Carrito</h1>
    `
    modalContainer.append(modalHeader)

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className="modal-header-button";
    modalbutton.addEventListener("click", ()=> {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalbutton)
    
    carrito.forEach((pizza) => { 
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML=`
        <img src ="${pizza.img}">
        <h3>${pizza.nombre}</h3>
        <p> $ ${pizza.precio} </p>
        <p> Cantidad: ${pizza.cantidad} </p>
        <p> Total : ${pizza.cantidad * pizza.precio} </p>
        <span class ="borrar-item"> ✖ </span>
        `;

        modalContainer.append(carritoContent);

        let borrar = carritoContent.querySelector(".borrar-item")     
        borrar.addEventListener("click", () =>{
            eliminarPizza(pizza.id)
            guardarData()
        })
    });

    const precioTotal = carrito.reduce((acc, pizza) => acc + pizza.precio * pizza.cantidad, 0)
    const totalCompra = document.createElement("div")
    totalCompra.className= "total-content"
    totalCompra.innerHTML = `Total a pagar $ ${precioTotal}`;
    modalContainer.append(totalCompra) 

    const confirmarCompraBtn = document.createElement("button");
    confirmarCompraBtn.innerText = "Confirmar compra";
    confirmarCompraBtn.id = "confirmarCompraBtn";
    confirmarCompraBtn.className="confirmarBtn"
    modalContainer.append(confirmarCompraBtn);

    confirmarCompraBtn.addEventListener('click', async () => {
        if (carrito.length === 0) {
          swal('Carrito vacio', 'Debes ingresar tus productos!', 'error');
        } else {
          const users = await getUsers();
          const user = users[0];
          const message = `Tu compra ha sido confirmada. Los productos serán enviados a ${user.location.city}, ${user.location.country} en un plazo de 30 minutos máximo!`;
          swal('¡Compra realizada!', message, 'success');
          carrito = [];
          carritoCounter();
          guardarData();
          carritoCounter();
          funcionesCarrito();
        }
      });   
                
};


const getUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  };

verCarrito.addEventListener("click", funcionesCarrito)



const eliminarPizza = (id) => {

    const buscarId = carrito.find((element) => element.id === id)
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
        
    })
    carritoCounter();
    funcionesCarrito();
};

const carritoCounter = () => {
    contarCarrito.style.display ="block";
    contarCarrito.innerText = carrito.length
}

const guardarData = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))}

JSON.parse(localStorage.getItem("carrito"))
