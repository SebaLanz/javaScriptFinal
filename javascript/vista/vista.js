import Controlador from '../controlador/con_clave.js';
import SweetAlert from '../frameworks/sweetAlert.js';
const objClave = new Controlador();
const objCantidad = new Controlador();
const sweetBtn = new SweetAlert();

let arrayLi = [];
document.getElementById("idBtnGenerarClave").addEventListener("click", function(event) {
    event.preventDefault();
    crearClaves();
});

 

document.getElementById("idBtnMostrarClaves").addEventListener("click", function(event) {
    event.preventDefault();
    objClave.mostrarClaves();
});


document.getElementById("idBtnBorrarClaves").addEventListener("click",function(event){
    event.preventDefault();  
    sweetBtn.borrarContenidoAlerta();
}); 


const crearClaves = () => {
    const errorModal = document.getElementById("error-modal");
    errorModal.innerHTML = ""; // Limpio el contenido previo del modal (del error).

    const numerosLista = document.getElementById("numeros-lista");
    numerosLista.innerHTML = "";// Limpio el contenido previo del modal de claves generadas.

    let cantidad = document.getElementById("TxtCantidad").value;
    let claves_a_generar = objCantidad.validar_cantidad_claves(cantidad);
    if (claves_a_generar === true){
        let i = 0;
        let longitud_clave = [];
        let todasLasClaves = [];

        // Paso 1: Intentar obtener el array de claves del localStorage
        const jsonClavesParseado = localStorage.getItem("arrayClaves");
        if (jsonClavesParseado) {
            todasLasClaves = JSON.parse(jsonClavesParseado); // Si existe, lo convertimos de nuevo a un array
        }
        
        let lastID = parseInt(localStorage.getItem("lastID")) || 0;

        while ( i < cantidad) {
            longitud_clave[i] = prompt('Ingrese logitud de clave, mínimo 7 máximo 20');
            i++;
        }
        let numerosLista = document.getElementById("numeros-lista");
        let numeroItem=[];
        let array_de_claves=[];
        for (let i = 0; i < cantidad; i++) { // Corregir aquí: usar < en lugar de <= para evitar iterar de más
            lastID++;
            array_de_claves[i] = objClave.validar_longitud(longitud_clave[i]);
            numeroItem[i] = document.createElement("li");
            numeroItem[i].textContent = array_de_claves[i];
            numerosLista.appendChild(numeroItem[i]);
            arrayLi.push(numeroItem[i]);
            
            // Añadir la clave al array de claves generadas
            todasLasClaves.push({
                id: lastID,
                clave: array_de_claves[i]
            });
        }
        // Paso 2: Convertir el array de claves a formato JSON y almacenarlo en el localStorage
        const jsonClavesActualizado = JSON.stringify(todasLasClaves);
        localStorage.setItem("arrayClaves", jsonClavesActualizado);

        //Almaceno el último ID para poder ir actualizando el array "arrayClaves" con un id autoincremental.
        localStorage.setItem("lastID", lastID);
    } else {
        
       // Modificar el contenido del modal para mostrar el mensaje de "valor inválido"
        const numerosLista = document.getElementById("error-modal");
        numerosLista.innerHTML = ""; // Limpiamos el contenido previo del modal
        let txtError = document.getElementById("TxtCantidad").value;
        if (txtError === '') {
            txtError = "un campo vacío";
        }
        const mensajeInvalido = document.createElement("p");
        //Al utilizar innerHTML, puedo utilizar etiquetas como <BR>
        mensajeInvalido.innerHTML = `
                                    Ingresó: "<b style="color:red">${txtError}</b>".<br>
                                    El valor ingresado, no es válido para generar claves aleatorias, intente nuevamente.`;
        numerosLista.appendChild(mensajeInvalido);

    }
}