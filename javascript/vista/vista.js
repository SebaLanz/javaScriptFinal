import Controlador from '../controlador/con_clave.js';
import SweetAlert from '../frameworks/sweetAlert.js';
const objClave = new Controlador();
const objCantidad = new Controlador();
const sweetBtn = new SweetAlert();

let arrayLi = []; //Acá después almaceno las claves generadas posteriormente.
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
    //Consulto si hay datos en el localstore
    let lastID = parseInt(localStorage.getItem("lastID"));
    if (localStorage.length === 0 || lastID === 0) {
        sweetBtn.sinDatosAlert();//Muestro alerta del local vacío.
    }else{
        sweetBtn.borrarContenidoAlerta();//Borro el contenido del local y muestro alerta diferente a la de sin datos.
    }
}); 


const crearClaves = async () => {
    //Inicio de limpieza de modales.
    const errorModal = document.getElementById("error-modal");
    errorModal.innerHTML = ""; // Limpio el contenido previo del modal (del error).
    const numerosLista = document.getElementById("numeros-lista");
    numerosLista.innerHTML = "";// Limpio el contenido previo del modal de claves generadass
    //Fin de limpieza de modales.
        let cantidad = document.getElementById("TxtCantidad").value;
        let claves_a_generar = objCantidad.validar_cantidad_claves(cantidad);
        let radio1 = document.getElementById("radio1");
        let radio2 = document.getElementById("radio2");
        let radioActivado;

        if (radio1.checked) {
            radioActivado = 'radio1';
        }else if (radio2.checked){
            radioActivado = 'radio2';
        }else{
            radioActivado = 'radio1';//lo pongo default
        }

    if (claves_a_generar === true){
        let i = 0;
        let longitud_clave = [];
        let todasLasClaves = [];
        //1): Intentar obtener el array de claves del localStorage y lo almaceno en "jsonClavesParseado"
        const jsonClavesParseado = localStorage.getItem("arrayClaves");
            if (jsonClavesParseado) {
                todasLasClaves = JSON.parse(jsonClavesParseado); // Si existe, lo convertimos de nuevo a un array
            }    
            let lastID = parseInt(localStorage.getItem("lastID")) || 0;
            while ( i < cantidad) {
                
                longitud_clave[i] = await sweetBtn.solicitarNumero(cantidad);
                i++;
            }
            let numerosLista = document.getElementById("numeros-lista");
            let numeroItem=[];
            let array_de_claves=[];
            for (let i = 0; i < cantidad; i++) {
                lastID++;
                array_de_claves[i] = objClave.validar_longitud(longitud_clave[i],radioActivado);
                
                numeroItem[i] = document.createElement("li");
                numeroItem[i].textContent = array_de_claves[i];
                numerosLista.appendChild(numeroItem[i]);
                arrayLi.push(numeroItem[i]);     
                // Agrego-push la clave al array de claves generadas
                todasLasClaves.push({
                    id: lastID,
                    clave: array_de_claves[i]
                });
            }
            //2): Convierto el array de claves a formato JSON y almacenarlo en el localStorage
            const jsonClavesActualizado = JSON.stringify(todasLasClaves);
            localStorage.setItem("arrayClaves", jsonClavesActualizado);
            //Almaceno el último ID para poder ir actualizando el array "arrayClaves" con un id autoincremental.
            localStorage.setItem("lastID", lastID);
    } else {    
        //si el Txt no es número válido, abro el modal con el id "exampleModal", función myModal.show();
        const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
        myModal.show();
        // Modifico el contenido del modal para mostrar el mensaje de "valor inválido"
        const numerosLista = document.getElementById("error-modal");
        numerosLista.innerHTML = ""; // Limpiamos el contenido previo del modal
        let txtError = document.getElementById("TxtCantidad").value;
        if (txtError === '') {
            txtError = "un campo vacío";
        }
        const mensajeInvalido = document.createElement("p");
        //Al utilizar innerHTML, puedo utilizar etiquetas como <BR>
        mensajeInvalido.innerHTML = `
                                    Ingresó: "<b style="color:red !important">${txtError}</b>".<br>
                                    El valor ingresado, no es válido para generar claves aleatorias, intente nuevamente.`;
        numerosLista.appendChild(mensajeInvalido);
    }
}
