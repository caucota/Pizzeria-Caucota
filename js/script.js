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
    document.getElementById("totalAPagarInput").value = "$" + precioTotal;
    document.getElementById("formPagoInput").value = opcionesFormaPago;
    document.getElementById("nombreInput").value = nombreCliente;
    document.getElementById("apellidoInput").value = apellidoCliente;
    document.getElementById("domicilioInput").value = direccionCliente;

} else {
    alert("Gracias por tu visita. Te esperamos..")
}
    