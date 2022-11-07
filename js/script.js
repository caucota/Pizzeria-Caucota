class Persona{
    constructor(apellido, nombre, dni){
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
    }
    set Apellido(apellido){
        this.apellido = apellido;
    }
    set Nombre(nombre){
        this.nombre = nombre;
    }
    set Dni(dni){
        this.dni = dni;
    }
}

class Cliente extends Persona{
    constructor(apellido, nombre, dni, domicilio, telefono){
        super(apellido, nombre, dni);
        this.domicilio = domicilio;
        this.telefono  = telefono;
    }
    set Telefono(telefono){
        this.telefono = telefono;
    }
    set Domicilio(domicilio){
        this.domicilio = domicilio;
    }
}

class metodoPago{
    constructor(tipo, nroTarjeta, codigoSeguridad, fechaVencimiento, nombre){
        this.tipo = tipo;
        this.nroTarjeta = nroTarjeta;
        this.codigoSeguridad = codigoSeguridad;
        this.fechaVencimiento = fechaVencimiento;
        this.nombre = nombre
    }
}
//function Producto (id, tipo, nombre, imagen, precio, stock) {

function Producto (id, tipo, nombre, precio, stock, img) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock||0;
    this.img = img;
}

class opcionesListaCompra{
    constructor(id, img, operacion){
        this.id = id;
        this.img = img;
        this.operacion = operacion;
    }
}

class opcionMenu{
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
    tieneStock(){
        let idxTieneStock = arrayProductos.findIndex(prod=> (prod.tipo == this.id) && (prod.stock > 0) );
        return (idxTieneStock !== -1);
    }
};

let nuestroCliente = new Cliente();

let textoBusqueda = "";
let inputBuscar = document.getElementById("textoABuscar");
inputBuscar.addEventListener("change", ()=>{textoBusqueda = inputBuscar.value}) ;

let botonBusqueda = document.getElementById("botonBuscar");
botonBusqueda.addEventListener("click", buscarConincidenciaNombreProd);
function buscarConincidenciaNombreProd(eventoBusqueda){
    eventoBusqueda.preventDefault();
    menuTiposProductos(0);
}

let botonCancelarBusqueda = document.getElementById("botonCancelarBuscar")
botonCancelarBusqueda.addEventListener("click", cancelarBuscarConincidenciaNombreProd);
function cancelarBuscarConincidenciaNombreProd(eventoBusqueda){
    inputBuscar.value = "";
    textoBusqueda = "";
    menuTiposProductos(0);
}


let opcionesBotonesCarrito = [];
fetch('./json/data.json')
.then(response => response.json())
.then((info)=> armarArrayBotonesCarrito(info))
.catch((err) => { throw err });

function armarArrayBotonesCarrito(lista){
    for (const opciones of lista){
        opcionesBotonesCarrito.push(opciones);
    }
    localStorage.setItem("arrayOperacionesCarrito", JSON.stringify(opcionesBotonesCarrito));
}

 
async function obtenerValorUSD(){
    let valorUSDBlue = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then( response => response.json())
    .then((objetoUSD)=> { return objetoUSD[1]['casa']['venta']});
    localStorage.setItem("dolarBlue", parseFloat(valorUSDBlue))
    return valorUSDBlue;
}


async function obtenerValorBtc(totalCarrito){
    let dolarBlue = localStorage.getItem("dolarBlue").replace(',', '.');
    let valorBtc = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then( response => response.json())
    .then((objetoBtc)=> {return objetoBtc.bpi.USD.rate_float});
    localStorage.setItem("valorBTCUSD", valorBtc);
    localStorage.setItem("valorBTCARG", (valorBtc * dolarBlue));
    dolarBlue = parseFloat(valorBtc * parseFloat(dolarBlue)); // * dolarBlue;

    totalAPagarInput.value = '฿ ' + totalCarrito / dolarBlue;
    return valorBtc* dolarBlue;
};

const opcionMenuPizzas = new opcionMenu(1, "Pizzas");
const opcionMenuEmpanadas = new opcionMenu(2, "Empanadas");
const opcionMenuLomitos = new opcionMenu(3, "Lomitos");
//const opcionMenuPlatos = new opcionMenu(4, "Platos");


let opcionesMenu = [];
opcionesMenu.push(opcionMenuPizzas);
opcionesMenu.push(opcionMenuEmpanadas);
opcionesMenu.push(opcionMenuLomitos);
//opcionesMenu.push(opcionMenuPlatos);


function menuTiposProductos(idTipoProd){

    let divContenedorTiposProd = document.getElementById("contenedorTiposProductos");
    divContenedorTiposProd.innerHTML = "";

    let tipoProdSeleccionDropDown = document.getElementById("seleccionDropDown");

    let nombreProdSeleccionDropDown = "Todos Nuestros Productos";

    let liNuevoFiltroTipoProd;
    let dropDownFiltroTipoProd = document.getElementById("filtrosDropDown");
    dropDownFiltroTipoProd.innerHTML = "";
    liNuevoFiltroTipoProd = document.createElement("li");
    liNuevoFiltroTipoProd.append(agregarMenuTipoProd(0, nombreProdSeleccionDropDown));
    dropDownFiltroTipoProd.append(liNuevoFiltroTipoProd);

    for (const opcMenu of opcionesMenu){
        liNuevoFiltroTipoProd = document.createElement("li");
        liNuevoFiltroTipoProd.append(agregarMenuTipoProd(opcMenu.id, opcMenu.nombre));
        dropDownFiltroTipoProd.append(liNuevoFiltroTipoProd);

        if ((opcMenu.id == idTipoProd) || (idTipoProd == 0)){
            //let conStock = opcMenu.tieneStock();
            let nuevaCardTipoPord = document.createElement("div");
            nuevaCardTipoPord.id = "TipoProducto" + opcMenu.id;
            let nuevoTituloTipoProd = document.createElement("h3");
            nuevoTituloTipoProd.innerText = opcMenu.nombre;
            nuevaCardTipoPord.appendChild(nuevoTituloTipoProd);
            divContenedorTiposProd.append(nuevaCardTipoPord);
            let divCardsPorTipoProd = document.createElement("div");
            divCardsPorTipoProd.className = "div-cards";
            divContenedorTiposProd.append(divCardsPorTipoProd);
            if (opcMenu.id == idTipoProd) {
                filtrarProductosPorTipoProd(idTipoProd)
                nombreProdSeleccionDropDown = opcMenu.nombre;
            } ;
        };
    };
    if (idTipoProd == 0) {
        filtrarProductosPorTipoProd(0)
    } ;
    tipoProdSeleccionDropDown = document.getElementById("seleccionDropDown");
    tipoProdSeleccionDropDown.textContent = nombreProdSeleccionDropDown;

}

function agregarMenuTipoProd(idOpcion, nombreOpcion){
    let aNuevoFiltroTipoProd;
    aNuevoFiltroTipoProd = document.createElement("a");
    aNuevoFiltroTipoProd.id = "idFiltroTipoProd"+idOpcion;
    aNuevoFiltroTipoProd.classList.add("dropdown-item");
    aNuevoFiltroTipoProd.setAttribute("idTipoProdFiltro", idOpcion);
    aNuevoFiltroTipoProd.href = "#";
    aNuevoFiltroTipoProd.innerText = nombreOpcion; 
    aNuevoFiltroTipoProd.addEventListener("click", seleccionFiltroPorTipoProd)
    return aNuevoFiltroTipoProd;
}

function seleccionFiltroPorTipoProd(eventoFiltro){
    let tipoProdFiltrar = parseInt(eventoFiltro.target.getAttribute("idTipoProdFiltro"))||0;
    inputBuscar.value = "";
    textoBusqueda = "";
    menuTiposProductos(tipoProdFiltrar);
}

let botonSiguiente = document.getElementById("siguiente");
botonSiguiente.addEventListener("click", ValidarDatosSiguiente)

function ValidarDatosSiguiente(){
    let mensaje = "";
    let datosControlar = document.getElementById("nombreInput");
    (datosControlar.value == "")?mensaje = "*Nombre": nuestroCliente.Nombre = datosControlar.value   ;

    datosControlar = document.getElementById("apellidoInput");
    (datosControlar.value == "")?mensaje = ((mensaje != "")?mensaje + " ":"") + "*Apellido" : nuestroCliente.Apellido = datosControlar.value;

    datosControlar = document.getElementById("domicilioInput");
    (datosControlar.value == "")? mensaje = ((mensaje != "")?mensaje + " ":"") + "*Domicilio": nuestroCliente.Domicilio = datosControlar.value;


    if(mensaje != ""){
        mensaje = "Para continuar con la compra debe completar: " + mensaje;
        Swal.fire(
            'Falta muy poco para completar su pedido.',
            mensaje,
            'warning'
          )
    }else{
        Swal.fire(
            nuestroCliente.nombre +', estamos preparando tu pedido. Gracias',
            "Volve pronto!!!",
            'success'
        )

    }
}

let opcionesFormasDePago = document.getElementById("pago-bitcoin");
opcionesFormasDePago.addEventListener("click", funcionPagoCompra);

opcionesFormasDePago = document.getElementById("opcion-pago-tarjeta");
opcionesFormasDePago.addEventListener("click", funcionPagoCompra);


opcionesFormasDePago = document.getElementById("pago-efectivo");
opcionesFormasDePago.addEventListener("click", funcionPagoCompra);


function funcionPagoCompra(evento){
    let seleccionFormaDePago = document.getElementById("boton-opciones-compra");
    let totalCarrito = localStorage.getItem("totalCompra");
    switch (evento.target.id){
        case "pago-bitcoin":{
            seleccionFormaDePago.innerText = "Bitcoin";
            totalAPagarInput.value = "Calculando valor actual de BTC...." ;

            let timerInterval
            Swal.fire({
            title: 'Consultando valores actualizados de Bitcoin y del dolar!',
            html: 'Tiempo restante<b></b> milliseconds.',
            timer: 1100,
            timerProgressBar: true,
            didOpen: () => {
                obtenerValorUSD();
                setTimeout(() => { obtenerValorBtc(totalCarrito)}, 1000);
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
            })
            
            break;
        }
        case "opcion-pago-tarjeta":{
            seleccionFormaDePago.innerText = "Tarjeta";
            totalAPagarInput.value = "$" + totalCarrito * 1.10;
            break;
        }
        case "pago-efectivo":{
            seleccionFormaDePago.innerText = "Efectivo";
            totalAPagarInput.value = "$" + totalCarrito;
            break;
        }
    }
}

let productosSeleccionados = [];

/*
class Compra{
    constructor(cliente, metodoPago){
        this.cliente = new Cliente(cliente.apellido, cliente.nombre, cliente.dni, cliente.dni, cliente.domicilio, cliente.telefono);
        this.metodoPago = metodoPago
    }
}
*/


function SumarPedido(evento){
    let idProductoSumarORestar = evento.target.getAttribute ("idProducto");
    let sumarORestar = "sumar";
    
    evento.target.getAttribute("tipoOperacion") == "restar" && (sumarORestar = "restar");
    evento.target.getAttribute("tipoOperacion") == "eliminarProd" && (sumarORestar = "eliminar");

    let cardStockProdSeleccionado = document.getElementById("cardStock_"+ idProductoSumarORestar);
    let stockProd = parseInt((localStorage.getItem("stock_" + idProductoSumarORestar) || 0));
    switch (sumarORestar){
        case "sumar":{
            if (stockProd > 0){
                productosSeleccionados.push(idProductoSumarORestar);
                stockProd--;
                Toastify({
                    text: "Producto agregado",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Producto sin stock",
                    text: 'Pedimos disculpas por no poder satisfacer su necesidad.'
                })
            }
            break;
        }
        case "restar":{
            let posicionProdEliminar = productosSeleccionados.indexOf(idProductoSumarORestar);
            productosSeleccionados.splice(posicionProdEliminar,1);
            stockProd++;
            Toastify({
                text: "Producto restado",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #993300, #96c93d)",
                }
            }).showToast();            
            
            break;
        }
        case "eliminar":{
            Swal.fire({
                title: '¿Esta seguro de eliminar este Producto?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si. Eliminar Producto!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    'Producto Eliminado!',
                    '',
                    'success'
                    )
                    let cantPordSelecc = productosSeleccionados.reduce((total, id)=> {return id === idProductoSumarORestar ? total +=1 : total}, 0);
                    stockProd += cantPordSelecc;
                    let productosSeleccAux = productosSeleccionados.filter((prod)=> prod != idProductoSumarORestar);
                    productosSeleccionados = productosSeleccAux;

                    mostrarStockCard({cardStockSel: cardStockProdSeleccionado, idProdSel: idProductoSumarORestar, stockProdSel: stockProd});
                }
            })
            break;
        }
    };
    mostrarStockCard({cardStockSel: cardStockProdSeleccionado, idProdSel: idProductoSumarORestar, stockProdSel: stockProd});
}

function mostrarStockCard(item){
    // desestructuracion en parametros
    const {cardStockSel, idProdSel, stockProdSel} = item; 
    //console.log(item);
    if (cardStockSel !== null){
        cardStockSel.innerText = `(Stock:  ${stockProdSel}  )`;
    };
    localStorage.setItem("stock_" + idProdSel, stockProdSel);
    localStorage.setItem("jsonProdSeleccionados", JSON.stringify(productosSeleccionados));
    sinRepetidos()
}

function sumarProducto(eventoSumar){
    SumarPedido(eventoSumar);
}

let contenedorCarrito = document.getElementById("carrito-compras");
let divContenedorListaCompra = document.getElementById("div-carrito-compras");

function sinRepetidos(){

    divContenedorListaCompra.innerHTML = "";
    // spread
    let productosNoRepetidos = [...new Set(productosSeleccionados)]; 
    let totalCarrito = 0;
    let divTotal = document.getElementById("totalCarrito");
    divTotal.remove();

    productosNoRepetidos.forEach((seleccionado) =>{
        let prodClickeado = arrayProductos.find((cadaProd) =>{
            if (seleccionado == cadaProd.id){
                return cadaProd;
            }
        })
        
        let tipoProducto = opcionesMenu.find((cadaTipoProd) => {
            if (prodClickeado.tipo == cadaTipoProd.id){
                return cadaTipoProd;
            }
        })
        
        let cantidad = productosSeleccionados.reduce((total, id) => {
            return id === seleccionado ? total += 1 : total
        }, 0)
        
        totalCarrito += prodClickeado.precio*cantidad;

        let contenedorListaCarrito = document.createElement("ul");
        contenedorListaCarrito.classList.add("list-group");

        let listaProductosCarrito = document.createElement("li");
        listaProductosCarrito.classList.add("list-group-item", "div-iconos-lista-compra");
        listaProductosCarrito.innerText = `${cantidad} ${tipoProducto.nombre} ${prodClickeado.nombre} $${prodClickeado.precio*cantidad}`;

        let opcionesListaCarrito = document.createElement("div");
        opcionesListaCarrito.classList.add("div-imagenes-lista-carrito");

        let divProductoPedido = document.createElement("div");
        divProductoPedido.classList.add("div-sumar-producto");

        const arrayOpCarrito = JSON.parse(localStorage.getItem("arrayOperacionesCarrito"));
        for (const opcionCarrito of arrayOpCarrito){
            let imagenOpcion = document.createElement("img");
            imagenOpcion.src = `${opcionCarrito.img}`;
            imagenOpcion.id = 'imgSumar'+prodClickeado.id;
            imagenOpcion.setAttribute("idProducto", prodClickeado.id);
            imagenOpcion.setAttribute("tipoOperacion", opcionCarrito.operacion);
            imagenOpcion.addEventListener("click", sumarProducto);
            divProductoPedido.append(imagenOpcion);
        }

        opcionesListaCarrito.append(divProductoPedido);
        listaProductosCarrito.append(opcionesListaCarrito);
        contenedorListaCarrito.append(listaProductosCarrito);
        divContenedorListaCompra.append(contenedorListaCarrito);
        contenedorCarrito.append(divContenedorListaCompra);
    })
    divTotal = document.createElement("div");
    divTotal.id = "totalCarrito";
    divTotal.innerText = "TOTAL: $" + totalCarrito;
    contenedorCarrito.append(divTotal);

    localStorage.setItem("totalCompra", totalCarrito);

    document.getElementById("totalAPagarInput").value = "$" + totalCarrito;



    contenedorCarrito.style.height = "" + (200 + productosNoRepetidos.length * 80) + "px";
}


let pizzaA = new Producto(1, 1, "Muzzarella", 800, 10, ("./img/pizza1.png"));
let pizzaB = new Producto(2, 1, "Napolitana", 850, 5, ("./img/pizza2.png"));
let empanadaA = new Producto(3, 2, "Arabes", 50, 11, ("./img/empanada1.png"));
let empanadaB = new Producto(4, 2, "Jamón y Queso", 70, 10, ("./img/empanada2.png"));
let lomitoA = new Producto(5, 3, "Vegetariano", 900, 0, ("./img/lomito1.png"));
let lomitoB = new Producto(6, 3, "Común", 800, 0, ("./img/lomito2.png"));
/*
let PlatoA = new Producto(7, 4, "Común", 700, 15, "./img/lomito1.png");
let PlatoB = new Producto(8, 4, "Común", 1000, 20, "./img/pizza2.png");
let arrayProductos = [pizzaA, pizzaB, empanadaA, empanadaB, lomitoA, lomitoB, PlatoA, PlatoB];
*/
let arrayProductos = [pizzaA, pizzaB, empanadaA, empanadaB, lomitoA, lomitoB];


//---------------------------------------------html y jscript----------------------------------------
//CARDS


function filtrarProductosPorTipoProd(idTipoProd){
    let arrayFiltradosPorCoincidenciaNombreMenu = [];
    if (idTipoProd == 0 && textoBusqueda.length > 0){
        let arrayOpcionesMenuFiltrado = opcionesMenu.filter( (opcMenu) => opcMenu.nombre.toLowerCase().indexOf(textoBusqueda.toLocaleLowerCase()) > -1);
        arrayFiltradosPorCoincidenciaNombreMenu = arrayProductos.filter((prod)=>{
            if (arrayOpcionesMenuFiltrado.findIndex( (tprod)=> tprod.id == prod.tipo) > -1){
                return prod;
            }
        })
    }
    let arrayProductosMostrar = arrayProductos.filter((prod)=>{
        if ( (prod.nombre.toLowerCase().indexOf(textoBusqueda.toLowerCase()) > -1) || 
             (arrayFiltradosPorCoincidenciaNombreMenu.findIndex((prodFiltradoPorMenu)=> prodFiltradoPorMenu.id == prod.id ) > -1)){
                return prod;
             }
        });
    arrayProductosMostrar.forEach((prod) => {
        if ((prod.tipo == idTipoProd) || (idTipoProd == 0)){
            let contenedor;
            contenedor = document.getElementById("TipoProducto"+prod.tipo);
            //Contenedor card.tipo
            let contenedorGeneral = document.getElementById("div_cards" + prod.tipo);
            if (contenedorGeneral == null){
                contenedorGeneral = document.createElement("div");
                contenedorGeneral.classList.add("div-cards");
                contenedorGeneral.id = "div_cards" + prod.tipo;
            }
            //Div Cards
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<img src="${prod.img}" alt=""></img>`;
            //Body
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            //Text
            let cardTitulo = document.createElement("h5");
            cardTitulo.classList.add("card-title");
            cardTitulo.innerText = prod.nombre;

            let precio = document.createElement("p");
            precio.classList.add("card-text");
            precio.innerText = `$${prod.precio}`;

            let stock = document.createElement("p");
            stock.classList.add("card-text");

            let stockStorage = localStorage.getItem("stock_" + prod.id);
            if(stockStorage == null){
                stockStorage = prod.stock;
                localStorage.setItem("stock_" + prod.id, stockStorage );                
            }
            stock.innerText = `(Stock: ${stockStorage})`;
            stock.id = "cardStock_" + prod.id;
            //Boton
            let botonSumarCarrito = document.createElement("button");
            botonSumarCarrito.classList.add("btn","btn-primary");
            botonSumarCarrito.innerText = "Comprar";
            botonSumarCarrito.setAttribute("idProducto", prod.id);
            botonSumarCarrito.addEventListener("click", SumarPedido);
            //Appends
            cardBody.append(cardTitulo);
            cardBody.append(precio);
            cardBody.append(stock);
            cardBody.append(botonSumarCarrito);
            card.append(cardBody);
            contenedorGeneral.append(card);
            contenedor.append(contenedorGeneral);

        }
    })
}
let objetoProductosSeleccionadosFromStorage = JSON.parse(localStorage.getItem("jsonProdSeleccionados"));
if (objetoProductosSeleccionadosFromStorage !== null){
    productosSeleccionados = objetoProductosSeleccionadosFromStorage;
}


sinRepetidos();
menuTiposProductos(0);