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
let saldoInicial = 25000;

//PRODUCTOS
const productos = [
    new Producto(1, "Televisor", 5000),
    new Producto(2, "Tablet", 4000),
    new Producto(3, "Notebook", 3000),
    new Producto(4, "Celular", 2000),
    new Producto(5, "Monitor", 1000)
]

const nombreCompleto = consultarNombreYApellido();

let carrito1 = new Carrito(saldoInicial, nombreCompleto);

menu();

console.log("--------------- ITEMS DEL CARRITO ---------------");
carrito1.productos.forEach(producto => console.log(producto));


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
        console.log("Elija el producto que quieras comprar:");
        productos.forEach(producto => console.log(producto.id + ") " + producto.nombre + " ($" + producto.precio + ")"));
        console.log("Ingrese otro valor para volver al menu!");

        const pr = productos.map(producto => producto.nombre)

        item = Number(prompt("Elija el producto a comprar (1-5): \n" + pr.join(" - ") + "\n¡Ingrese otro valor para volver al menu!"));

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

function validarPago(producto){

    let ret = true;

    if(carrito1.saldo >= producto.precio){
        carrito1.saldo -= producto.precio;
        carrito1.productos.push(producto);
        confirmacionCompra(producto);
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

/*
consultarNombreYApellido();

alert("Su saldo inicial es de: " + saldoInicial);

menu();

let productosComprados = "Televisor x" + cantTelevisores + " - Notebook x" + cantNotebooks + " - Tablet x" + cantTablets + " - Celular x" + cantCelulares + " - Monitor x" + cantMonitores;

//FINALIZACION
console.log("\n------FIN DE LA SIMULACION------"); 
console.log("Productos y Cantidad Comprada (c/u): " + productosComprados);
console.log("Saldo restante: " + saldo);
console.log("Saldo gastado: " + (saldoInicial - saldo));
console.log("--------------------------------");

document.write("<section><h2>RESULTADOS DE LA SIMULACION</h2>"); 
document.write("<p><strong>Productos y Cantidad Comprada (c/u):</strong> " + productosComprados + "</p>");
document.write("<p><strong>Saldo restante:</strong> $" + saldo + "</p>");
document.write("<p><strong>Saldo gastado:</strong> $" + (saldoInicial - saldo) + "</p></section>");
*/

/*********** MAIN ***********/

/******** FUNCIONES ********/
/*
function menu(){   
    let opcion = 0;
    do{
        console.log("\n*********** MENU ***********"); 
        console.log("Elija una opcion:");
        console.log("1) Comprar Productos");
        console.log("2) Consultar Saldo");
        console.log("3) Salir"); 
        opcion = Number(prompt("Opcion:"));

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
    do{
        console.log("\n*********** COMPRAS ***********"); 
        console.log("Elija el producto que quieras comprar:");
        console.log("1) Televisor ($5000)");
        console.log("2) Notebook ($4000)");
        console.log("3) Tablet ($3000)");
        console.log("4) Celular ($2000)");
        console.log("5) Monitor ($1000)");
        console.log("Ingrese otro valor para volver al menu!");
        item = Number(prompt("Elije una opcion:"));

        switch(item){
            case 1:
                saldo = validarPago(saldo, televisor, "Televisor");
                consultarSaldo();
            break;

            case 2:
                saldo = validarPago(saldo, notebook, "Notebook");
                consultarSaldo();
            break;

            case 3:
                saldo = validarPago(saldo, tablet, "Tablet");
                consultarSaldo();
            break;

            case 4:
                saldo = validarPago(saldo, celular, "Celular");
                consultarSaldo();
            break;
            
            case 5:
                saldo = validarPago(saldo, monitor, "Monitor");
                consultarSaldo();
            break;
            
            default:
                alert("INGRESANDO A MENU");
                menu();
        }
        
    }while((item>0) && (item<6))
}

function consultarNombreYApellido(){
    let nombre = "";
    let apellido = "";

    do{
        nombre = prompt("Ingrese su nombre");
        apellido = prompt("Ingrese su apellido");

        if ((nombre!="") && (apellido!="")){
            console.log(saludo(nombre, apellido));
        } else{
            alert("No ingresaste uno de los dos valores. Vuelve a intentarlo.");
        }
    }while((nombre=="") || (apellido==""))
}

function validarPago(dinero, productoPrecio, productoNombre){
    
    if(dinero >= productoPrecio){
        dinero -= productoPrecio;
        confirmacionCompra(productoNombre, productoPrecio);

        switch(productoNombre){
            case "Televisor":
                cantTelevisores += 1;
            break;

            case "Notebook":
                cantNotebooks += 1;
            break;
            
            case "Tablet":
                cantTablets += 1;
            break;

            case "Celular":
                cantCelulares += 1;
            break;

            case "Monitor":
                cantMonitores += 1;
            break;
        }
        
    } else {
        alert("SALDO INSUFICIENTE.");
        consultarSaldo();
    }

    return dinero;
}

function confirmacionCompra(nombre, precio){
    alert("COMPRASTE: "+ nombre + "\nSALDO ACTUAL: " + (saldo-precio));
    console.log("\n!!!PRODUCTO COMPRADO: " + nombre + "!!!");
}

function consultarSaldo(){
    console.log("!!!SALDO ACTUAL: " + saldo + "!!!");
}

function saludo (nombre, apellido){
    return "Hola " + nombre + " " + apellido + "! Gracias por entrar en la simulacion."; 
}
*/

/******** FUNCIONES ********/