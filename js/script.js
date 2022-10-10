

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
function Producto (id, tipo, nombre, precio, stock) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock||0;
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
const opcionMenuPizzas = new opcionMenu(1, "Pizza");
const opcionMenuEmpanadas = new opcionMenu(2, "Empanadas");
const opcionMenuLomitos = new opcionMenu(3, "Lomitos");
const opcionMenuFinalizarCompra = new opcionMenu(4, "Finalizar Compra")
const opcionMenuCancelarCompra = new opcionMenu(5, "Cancelar Compra")

let opcionesMenu = [];
opcionesMenu.push(opcionMenuPizzas);
opcionesMenu.push(opcionMenuEmpanadas);
opcionesMenu.push(opcionMenuLomitos);

function menuTiposProductos(){
    let listaTiposProductos = "";
    if (productosSeleccionados.length != 0){
        listaTiposProductos = "¿Desea agregar algún otro producto a su compra?\n";
    };
    listaTiposProductos = listaTiposProductos.concat("Ingrese el numero del producto que desea comprar: ");

    for (const opcMenu of opcionesMenu){
        let conStock = opcMenu.tieneStock();
        listaTiposProductos = listaTiposProductos.concat("\n", opcMenu.id, "-", opcMenu.nombre)
        if (!conStock){
            listaTiposProductos = listaTiposProductos.concat("(Sin Stock)")
        }
    };

    listaTiposProductos = listaTiposProductos.concat("\n", opcionMenuFinalizarCompra.id, "-", opcionMenuFinalizarCompra.nombre)
    if(productosSeleccionados.length > 0){
        listaTiposProductos = listaTiposProductos.concat("\n", opcionMenuCancelarCompra.id, "-", opcionMenuCancelarCompra.nombre)
    }
    listaTiposProductos = listaTiposProductos.concat("\n Total:$" , totalCompra());
    return listaTiposProductos;
}

let arraySubMenu = [];
function menuProductosSegunTipo(idTipoProducto){
    let submenuProductos = 'Elige entre nuestras opciones:';
    let arraySegunTipoProducto = arrayProductos.filter((prod)=>prod.tipo == idTipoProducto  && prod.stock > 0);
    if (arraySegunTipoProducto.length > 0){
        submenuProductos = submenuProductos.concat("\n0-Menu Anterior");
        arraySubMenu = [];
        let contador = 0;
        for( prod of arraySegunTipoProducto){
            contador +=1;
            submenuProductos = submenuProductos.concat("\n", contador, "-", prod.nombre , " : $", prod.precio );
            let prodSubMenu = new Producto(prod.id, idTipoProducto, prod.nombre, 0);
            arraySubMenu.push(prodSubMenu);
        }
    }else{
        submenuProductos = 'Opción incorrecta.';
        submenuProductos = submenuProductos.concat("\n0-Menu Anterior");
    }
    return submenuProductos;
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
function SumarPedido(productoElegido){
    if (productoElegido != null){
        let tipoProd = opcionesMenu.find((op)=>op.id == productoElegido.tipo);
        let cantidadProducto = prompt ("Ingrese la cantidad de " + tipoProd.nombre + " " + productoElegido.nombre + " " + "que desea comprar (stock = " + productoElegido.stock + ") : " )
        
        if (cantidadProducto <= productoElegido.stock){

            productoElegido.stock = productoElegido.stock - cantidadProducto;

            let seleccionAnterior = productosSeleccionados.some(otroProducto => otroProducto.id === productoElegido.id)
            if (seleccionAnterior == true){
                productosSeleccionados.forEach ((otroProducto) =>{
                    if(otroProducto.id == productoElegido.id){
                        otroProducto.cantidad = parseInt(otroProducto.cantidad) + parseInt(cantidadProducto);
                        otroProducto.total = parseInt(otroProducto.cantidad) * otroProducto.precio;
                        return;
                    }
                })
            }else{
                productosSeleccionados.push({id: productoElegido.id, tipo: productoElegido.tipo, nombre: productoElegido.nombre, precio:productoElegido.precio, cantidad: parseInt(cantidadProducto), total:(cantidadProducto * productoElegido.precio)});
            }
        }else{
            alert("Stock insuficiente");
        }
    }else{
        alert("Error al seleccionar el Producto");
    }

};


function totalCompra(){
    return productosSeleccionados.reduce((acumulador, elemento)=>acumulador + elemento.total, 0);
}
function resumenCompra(){
    let resumenPedido = "Resumen de su Pedido:";
    productosSeleccionados.forEach((prodCompra) =>{
        let tipoProd = opcionesMenu.find((op)=>op.id == prodCompra.tipo);
        resumenPedido = resumenPedido.concat("\n",prodCompra.cantidad, " " , tipoProd.nombre, " ", prodCompra.nombre, " :$", prodCompra.total);
    });
    resumenPedido = resumenPedido.concat("\nEn total serían: $", totalCompra());
    alert(resumenPedido);
}

let pizzaA = new Producto(1, 1, "Muzzarella", 800, 10)
let pizzaB = new Producto(2, 1, "Napolitana", 850, 5)
let empanadaA = new Producto(3, 2, "Arabes", 50, 11)
let empanadaB = new Producto(4, 2, "Jamón y Queso", 70)
let lomitoA = new Producto(5, 3, "Vegetariano", 900, 0)
let lomitoB = new Producto(6, 3, "Común", 800, 0)

let arrayProductos = [pizzaA, pizzaB, empanadaA, empanadaB, lomitoA, lomitoB];
/*
let catalogo = document.getElementById("catalogo");

for (const prod of arrayProductos){
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h2 class="tituloCard">Nombre: ${prod.nombre}</h2><p>Precio: $${prod.precio}</p>`
    catalogo.append(card);
}
*/
let cicloCompra = true;
while(cicloCompra) {
    let tipoProductoElegido = prompt(menuTiposProductos());
    if (tipoProductoElegido == "4"){
        break;
    }
    if (tipoProductoElegido == "5"){
        productosSeleccionados.splice(0, productosSeleccionados.length);
        break;
    }
    let productoElegidoPizza = prompt(menuProductosSegunTipo(tipoProductoElegido));
    if (productoElegidoPizza == "0"){
        continue;
    }
    if ((productoElegidoPizza <= arraySubMenu.length) && (productoElegidoPizza > 0)){
        let productoSubMenu = arraySubMenu[parseInt(productoElegidoPizza-1)];
        let productoAAgregar = arrayProductos.find((prod)=>prod.id == productoSubMenu.id);
        SumarPedido(productoAAgregar);
    }
    else
        alert("Seleccione una opción válida");
}


if (productosSeleccionados.length > 0) {
    resumenCompra();

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
    let cliente = new Cliente(apellidoCliente, nombreCliente, null, null, null);
    
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
    cliente.Domicilio = direccionCliente;
    
    let mensajeFormaPago = "Ingrese la forma de pago:";
    let opcionesFormaPago = "\n1- En efectivo\n2- Transferencia";
    let formaPago = prompt(mensajeFormaPago + opcionesFormaPago);
    if (formaPago == 1){
        opcionesFormaPago = "Efectivo";
    }else{
        opcionesFormaPago = "Transferencia";
    }
    
    alert("Gracias por tu compra " + cliente.nombre);
    document.getElementById("totalAPagarInput").value = "$" + totalCompra();
    document.getElementById("formPagoInput").value = opcionesFormaPago;
    document.getElementById("nombreInput").value = cliente.nombre;
    document.getElementById("apellidoInput").value = cliente.apellido;
    document.getElementById("domicilioInput").value = cliente.domicilio;

} else {
    alert("Gracias por tu visita. Te esperamos..")
}

