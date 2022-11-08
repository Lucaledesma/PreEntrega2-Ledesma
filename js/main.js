/*********** CLASES ***********/
class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    };

    descuento = () => this.precio -= this.precio * 0.20;

};

class Carrito {
    constructor(saldo, propietarioCarrito){
        this.saldo = saldo;
        this.propietarioCarrito = propietarioCarrito;
        this.productos = [];
    };

};
/*********** CLASES ***********/

/*********** MAIN ***********/
let saldoInicial = 20000;

//PRODUCTOS
const productos = [
    new Producto(1, "Televisor", 5000),
    new Producto(2, "Tablet", 4000),
    new Producto(3, "Notebook", 3000),
    new Producto(4, "Celular", 2000),
    new Producto(5, "Monitor", 1000)
]

const nombreCompleto = consultarNombreYApellido();

const carrito1 = new Carrito(saldoInicial, nombreCompleto);

consultarSaldo();
menu();

console.log("------ ITEMS DEL CARRITO ------");
carrito1.productos.forEach(producto => console.log(producto));

const carritoResultado = carrito1.productos.map(producto => producto.nombre);

//FINALIZACION
console.log("\n------FIN DE LA SIMULACION------"); 
console.log("CARRITO DE : " + carrito1.propietarioCarrito);
console.log("LISTA DE COMPRAS: " + carritoResultado.join(" - "));
console.log("SALDO RESTANTE: " + carrito1.saldo);
console.log("SALDO GASTADO: " + carrito1.productos.reduce((total, producto) => total + producto.precio, 0));
console.log("--------------------------------");

document.write("<section><h2>RESULTADOS DE LA SIMULACION</h2>"); 
document.write("<p><strong>CARRITO DE :</strong> " + carrito1.propietarioCarrito + "</p>");
document.write("<p><strong>LISTA DE COMPRAS:</strong> " + carritoResultado.join(" - ") + "</p>");
document.write("<p><strong>SALDO RESTANTE:</strong> $" + carrito1.saldo + "</p>");
document.write("<p><strong>SALDO GASTADO:</strong> $" + carrito1.productos.reduce((total, producto) => total + producto.precio, 0) + "</p></section>");

/*********** MAIN ***********/

/******** FUNCIONES ********/
function consultarNombreYApellido(){
    let nombre = "";
    let apellido = "";
    let nombreCompleto = "";

    do{
        nombre = prompt("Ingrese su nombre");
        apellido = prompt("Ingrese su apellido");

        if ((nombre!="") && (apellido!="")){
            nombreCompleto = nombre + " " + apellido;
        } else{
            alert("No ingresaste uno de los dos valores. Vuelve a intentarlo.");
        }
    }while((nombre=="") || (apellido==""))

    return nombreCompleto;
}

function menu(){   
    let opcion = 0;
    do{
        console.log("\n*********** MENU ***********"); 
        console.log("Elija una opcion:");
        console.log("1) Comprar Productos");
        console.log("2) Consultar Saldo");
        console.log("3) Salir"); 
        opcion = Number(prompt("Elija una opcion:\n1) Comprar Productos\n2) Consultar Saldo\n3) Salir"));

        switch(opcion){
            case 1:
                alert("INGRESANDO A COMPRAS");
                comprar();
            break;

            case 2:
                consultarSaldo();
                menu();
            break;

            case 3:
                alert("SALIENDO DEL SISTEMA");
                console.log("¡Gracias por su visita!. Que tenga un buen dia.");
            break;

            default:
                console.log("ERROR: OPCION NO VALIDA. INTENTE NUEVAMENTE.");
        }

    }while((opcion<1) || (opcion>3) || (isNaN(opcion)))
}

function comprar(){   
    let item = 0;
    let retorno = true;

    do{
        console.log("\n*********** COMPRAS ***********"); 
        console.log("Elija el producto que quieras comprar (1-5):");
        productos.forEach(producto => console.log(producto.id + ") " + producto.nombre + " ($" + producto.precio + ")"));
        console.log("Ingrese otro valor para volver al menu!");
        console.log("SI COMPRAS MAS DE UN MISMO PRODUCTO, LOS SIGUIENTES TENDRAN UN 10% DE DESCUENTO");

        const pr = productos.map(producto => producto.nombre)

        item = Number(prompt("Elija el producto a comprar (1-5): OTRO VALOR PARA IR AL MENU\n-\n" + pr.join(" - ") + "\n-\nSI COMPRAS MAS DE UN MISMO PRODUCTO, LOS SIGUIENTES TENDRAN UN 10% DE DESCUENTO"));

        if ((item>0) && (item<productos.length+1)){
            retorno = validarPago(productos.find(producto => producto.id==item));
        } else{
            alert("INGRESANDO A MENU");
            menu();
        }
        
    }while((item>0) && (item<productos.length+1) && (retorno == true))

    if(retorno == false){
        menu();
    }
}

function validarPago(pr){

    let ret = true;
    let aux = new Producto(pr.id, pr.nombre, pr.precio);

    if (carrito1.productos.some(producto => producto.nombre==aux.nombre)){
        aux.descuento();
    }

    if(carrito1.saldo >= aux.precio){
        carrito1.saldo -= aux.precio;
        carrito1.productos.push(aux);
        confirmacionCompra(aux);
    } else {
        ret = false;
        alert("SALDO INSUFICIENTE.");
        consultarSaldo();
    }

    return ret;

}

function confirmacionCompra(producto){
    alert("COMPRASTE: "+ producto.nombre + "\nSALDO ACTUAL: " + carrito1.saldo);
    console.log("\n!!!PRODUCTO COMPRADO: " + producto.nombre + "!!!");
}

function consultarSaldo(){
    alert("Saldo Actual: " + carrito1.saldo);
    console.log("!!!SALDO ACTUAL: " + carrito1.saldo + "!!!");
}
/******** FUNCIONES ********/