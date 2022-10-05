/*
let primerMensaje = "Ingrese el numero del producto que desea comprar: ";
let listaProductos = "\n1- Pizzas\n2- Empanadas\n3- Lomitos\n4- Finalizar Compra";
let opcionCancelar = "\n5- Cancelar Compra";
let cicloCompra = true;


function Productos (tipo, nombre, precio) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
}


function SumarPedido(productoElegido){
    let cantidadProducto = prompt ("Ingrese la cantidad de " + productoElegido.tipo + " " + productoElegido.nombre + " " + "que desea comprar: ")
    if (articulosPedidos != "")
    {
        articulosPedidos = articulosPedidos +"\n";
    };
    articulosPedidos = articulosPedidos + cantidadProducto + " " + productoElegido.tipo + " " + productoElegido.nombre;
    precioTotal = precioTotal + (cantidadProducto * productoElegido.precio);
    return primerPrecio + precioTotal;
}

let pizzaA = new Productos("Pizza", "Muzzarela", 800)
let pizzaB = new Productos("Pizza", "Napolitana", 850)
let empanadaA = new Productos("Empanadas", "Arabes", 50)
let empanadaB = new Productos("Empanadas", "Jamón y Queso", 70)
let lomitoA = new Productos("Lomito", "Vegetariano", 900)
let lomitoB = new Productos("Lomito", "Común", 800)

let segundoMensaje = "Elige entre nuestras opciones: ";
let precioTotal = 0;
let articulosPedidos = "";
let mensajeFinal = "En total serían: $";
let primerPrecio = "Hasta ahora son: $";


let arrayProductos = [pizzaA, pizzaB, empanadaA, empanadaB, lomitoA, lomitoB];
let catalogo = document.getElementById("catalogo");

for (const prod of arrayProductos){
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h2 class="tituloCard">Nombre: ${prod.nombre}</h2><p>Precio: $${prod.precio}</p>`
    catalogo.append(card);
}

while(cicloCompra) {
    let productoElegido = prompt (primerMensaje + listaProductos + "\n Total:$" + precioTotal);
    switch (productoElegido){
        case "1":
            let productoElegidoPizza = prompt (segundoMensaje + "\n1-" + pizzaA.nombre + "\n2-" + pizzaB.nombre + "\n3-Menu Anterior"  );
            switch (productoElegidoPizza) {
                case "1":{
                    alert(SumarPedido(pizzaA));
                    break;
                }
                case "2":{
                    alert(SumarPedido(pizzaB));
                    break;
                }
                default: {
                    break;
                }
            }
            break;

        case "2" :
            let productoElegidoEmpanada = prompt (segundoMensaje + "\n1-" + empanadaA.nombre + "\n2-" + empanadaB.nombre+ "\n3-Menu Anterior");
            switch (productoElegidoEmpanada){
                case "1":{
                    alert(SumarPedido(empanadaA));
                    break;
                }
                case "2":{
                    alert(SumarPedido(empanadaB));
                    break;
                }
                default: {
                    break;
                }
            }
            break;

        case "3":
            let productoElegidoLomito = prompt (segundoMensaje + "\n1-" + lomitoA.nombre + "\n2-" + lomitoB.nombre+ "\n3-Menu Anterior");
            switch (productoElegidoLomito){
                case "1":{
                    alert(SumarPedido(lomitoA));
                    break;
                }
                case "2":{
                    alert(SumarPedido(lomitoB));
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        case "4":{
            cicloCompra = false;
            break;
        }
        default:
        {
            precioTotal = 0
            cicloCompra = false;
            break;
        }
    }
    primerMensaje = "¿Desea agregar algún otro producto a su compra?\nIngrese el numero del que desea comprar: ";
    if (precioTotal > 0){
        listaProductos = listaProductos + opcionCancelar;
        opcionCancelar= "";
    }
}

console.log(precioTotal);
if (precioTotal > 0) {
    alert("Resumen de su Pedido:\n" +articulosPedidos + "\n" +mensajeFinal + " " + precioTotal);

    let cicloDatos = true
    let nombreCliente = "";
    let apellidoCliente = "";
    let direccionCliente = "";

    while (cicloDatos){
        nombreCliente = prompt("Ingrese su Nombre: ");
        apellidoCliente = prompt("Ingrese su Apellido: ");
        if ((nombreCliente !="") && (apellidoCliente !="")){
            console.log(nombreCliente + " " + apellidoCliente);
        }else{
            alert("Error: Vuelva a escribir su Nombre y Apellido");
            continue;
        }
        cicloDatos = false;
    }
    
    cicloDatos = true;
    
    while (cicloDatos){
        direccionCliente = prompt("Ingrese la dirección de su domicilio: ");
        if (direccionCliente != ""){
            console.log(direccionCliente);
        }else{
            alert("Error: Vuelva a ingresar su domicilio")
            continue;
        }
        cicloDatos = false;
    }
    
    let mensajeFormaPago = "Ingrese la forma de pago:";
    let opcionesFormaPago = "\n1- En efectivo\n2- Transferencia";
    let formaPago = prompt(mensajeFormaPago + opcionesFormaPago);
    if (formaPago == 1){
        opcionesFormaPago = "Efectivo";
    }else{
        opcionesFormaPago = "Transferencia";
    }
    
    alert("Gracias por tu compra " + nombreCliente);
    //document.getElementById("totalAPagarInput").value = "$" + precioTotal;
    document.getElementById("totalAPagarInput").innerText = "$" + precioTotal;
    document.getElementById("formPagoInput").value = opcionesFormaPago;
    document.getElementById("nombreInput").value = nombreCliente;
    document.getElementById("apellidoInput").value = apellidoCliente;
    document.getElementById("domicilioInput").value = direccionCliente;

} else {
    alert("Gracias por tu visita. Te esperamos..")
}
    
*/


//TIENDA

let precioTotal = 0
let totalFinal = 0

function Producto(nombre,precio,stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.restarStock = function(cantidad){ // recibe como parametro la cantidad, creo metodo para actualizar stock
        this.stock -= cantidad
    }
}

function calculadoraPrecioTotal (cantidadReloj,reloj){
    precioTotal = cantidadReloj * reloj
    totalFinal = totalFinal  + precioTotal
    alert("El precio total es $" + precioTotal)
}

let reloj1 = new Producto("Reloj Automatico",100,5)
let reloj2 = new Producto("Reloj a Cuerda",200,5)
let reloj3 = new Producto("Reloj con Calendario",300,5)
let reloj4 = new Producto("Reloj con Segundero",400,5)

let listaProductos = [reloj1,reloj2,reloj3,reloj4]
let resumenCompra = []

let cantidadCompra = prompt("Hola, ingrese la cantidad de productos que desea que comprar!!")

for(let i = 0; i < cantidadCompra; i++){

    let reloj = prompt("Seleccione un producto: \n1 - Reloj Automatico\n2 - Reloj a Cuerda\n3 - Reloj con Calendario\n4 - Reloj con Segundero\n5 - Salir")

    while(reloj != 5){
        if(reloj == 1 ){
            let cantidadReloj = prompt("¿Cuantos " + reloj1.nombre + " desea comprar?")
            if (cantidadReloj <= reloj1.stock){
                calculadoraPrecioTotal (cantidadReloj,reloj1.precio)
                // reloj1.restarStock(reloj1.stock)
                resumenCompra.push(reloj1.precio * cantidadReloj)
                break;
            }
            else{
                alert("No tenemos suficiente stock, la cantidad de stock es de " + reloj1.stock + " unidades.")
            }
        }
        else if (reloj == 2 ){
            let cantidadReloj = prompt("¿Cuantos " + reloj2.nombre + " desea comprar?")
            if (cantidadReloj <= reloj2.stock){
                calculadoraPrecioTotal(cantidadReloj,reloj2.precio)
                // reloj2.restarStock(reloj2.stock)
                resumenCompra.push(reloj2.precio * cantidadReloj)
                break;
            }
            else{
                alert("No tenemos suficiente stock, la cantidad de stock es de " + reloj2.stock + " unidades.")
            }
        }
        else if (reloj == 3 ){
            let cantidadReloj = prompt("¿Cuantos " + reloj3.nombre + " desea comprar?")
            if (cantidadReloj <= reloj3.stock){
                calculadoraPrecioTotal(cantidadReloj,reloj3.precio)
                // reloj3.restarStock(reloj3.stock)
                resumenCompra.push(reloj3.precio * cantidadReloj)
                break;
            }
            else{
                alert("No tenemos suficiente stock, la cantidad de stock es de " + reloj3.stock + " unidades.")
            }
        }
        else if (reloj == 4 ){
            let cantidadReloj = prompt("¿Cuantos " + reloj4.nombre + " desea comprar?")
            if (cantidadReloj <= reloj4.stock){
                calculadoraPrecioTotal(cantidadReloj,reloj4.precio)
                // reloj4.restarStock(reloj4.stock)
                resumenCompra.push(reloj4.precio * cantidadReloj)
                break;
            }
            else{
                alert("No tenemos suficiente stock, la cantidad de stock es de " + reloj4.stock + " unidades.")
            }
        }
        else{
            alert("Ingrese una opcion valida")
            break;
        }
    }
}
totalFinal = 0;
for(const resumen of resumenCompra){
	totalFinal = totalFinal + resumen;
}
alert("El total final a pagar a pagar es de: $" + totalFinal)
alert("Gracias por su compra")
