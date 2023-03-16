const menuContent = document.getElementById("menuContent")
const verCarrito = document.getElementById("carrito")
const modalContainer = document.getElementById("modal-container")
const pizzas = [
    {id:1 , tipo: "muzzarella", img:"./imgs/muzzarella.jpg", precio: 1200},
    {id:2, tipo: "fugazzetta", img:"./imgs/fugazzetta.jpg", precio: 1500},
    {id:3, tipo: "napolitana",img:"./imgs/napolitana.webp", precio: 1550},
    {id:4, tipo: "calabresa",img:"./imgs/calabresa.jpg", precio: 1800},
    {id:5, tipo: "especial",img:"./imgs/especial.jpg", precio: 2000},  
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || []

pizzas.forEach((pizza) => {
    let menu = document.createElement("div")
    menu.innerHTML = `
    <img src="${pizza.img}"></img>
    <h3> ${pizza.tipo}</h3>
    <p> ${pizza.precio}
    `;

     menuContent.append(menu)  

    let comprar = document.createElement("button")
    comprar.innerText= "Comprar";
    comprar.className= "comprar";

    menu.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: pizza.id,
            img: pizza.img,
            nombre: pizza.tipo,
            precio: pizza.precio
        });
        guardarData();
    })
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
    modalbutton.innerText = "x";
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
        <span class ="borrar-item"> X </span>
        `;

        modalContainer.append(carritoContent);
        let borrar = carritoContent.querySelector(".borrar-item")     
        borrar.addEventListener("click", () =>{
            eliminarPizza(pizza.id)
            guardarData()
        })
    });

    const precioTotal = carrito.reduce((acc, pizza) => acc + pizza.precio, 0)
    const totalCompra = document.createElement("div")
    totalCompra.className= "total-content"
    totalCompra.innerHTML = `total a pagar $ ${precioTotal}`;
    modalContainer.append(totalCompra)
};

verCarrito.addEventListener("click", funcionesCarrito)



const eliminarPizza = (id) => {

    const buscarId = carrito.find((element) => element.id === id)
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
        
    })
    
    funcionesCarrito();
}

const guardarData = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))}


JSON.parse(localStorage.getItem("carrito"))
