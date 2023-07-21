import Controlador from '../controlador/con_clave.js';//Me traigo las propiedades y métodos de "Controlador".
import SweetAlert from '../frameworks/sweetAlert.js';//Me traigo las propiedades y métodos de "sweetlaert".
//Creo objetos de tipo Controlador.
const objClave = new Controlador();
const objCantidad = new Controlador();

//objetos Alert.
const sweetError = new SweetAlert();
//Código
document.getElementById("idBtnGenerarClave").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que se ejecute cuando se carga la página.
    
    let cantidad = document.getElementById("TxtCantidad").value;
    let claves_a_generar = objCantidad.validar_cantidad_claves(cantidad);//llamo función validar

    if (claves_a_generar === true){
        /*Si claves_a_generar es true, el valor ingresado, es un número válido.*/
        let i = 0;
        let longitud_clave = [];/*Declaro array donde almaceno la longitud de cada clave a crear. 

        El usuario puede pedir n cantidad de claves.*/      
        while ( i <= (cantidad - 1)) {
            /*En longitud_clave[i] almaceno la longitud de la clave por cada espacio del array, por ejemplo:
            lugar 0 = longitud de 7. (válido)
            lugar 1 = 15. (válido)
            lugar 2 = asd. (no válido)*/
            longitud_clave[i] = prompt('Ingrese logitud de clave, mínimo 7 máximo 20');
            i++;
        }
        const numerosLista = document.getElementById("numeros-lista");
        const numeroItem=[];
        let array_de_claves=[];
        /*En este for, le asigno un valor vacío a array_de_claves a cada posición, si se pidieron 3 claves.
        Asigno 3 lugares vacíos y así. Hice esto, por que si declaro el array vacío, me imprime los valores
        pero con undefined adelante. Ejemplo:
        {undefined1)El campo no puede estar vacío.
        undefined2)Omitió ingresar un valor.
        undefined3)Omitió ingresar un valor.}*/
        for (let i = 0; i <= cantidad; i++) {           
            array_de_claves[i] =[''];
        }
        
        for (let i = 0; i < longitud_clave.length; i++) {
            
            /*Al incovar la funcion validar_longitud, valido las longitudes ingresadas.
            Si se encuentran dentro de los parametros arroja una clave aleatoria
            si no, arroja la excepción que pueden ser varias.*/
            array_de_claves[i] += `${objClave.validar_longitud(longitud_clave[i])}\n`;
            numeroItem[i] = document.createElement("li");
            numeroItem[i].textContent = array_de_claves[i];
            numerosLista.appendChild(numeroItem[i]);   
        }
    } 
    else{sweetError.errorAlert();}//No ingresaron número en cantidad de claves a generar.
    document.getElementById("idBtnBorrarClaves").addEventListener("click", function() {
        const numerosLista = document.getElementById("numeros-lista");
        numerosLista.innerHTML = ""; // Borra el contenido de la lista
    });
});
//Botón para borrar las claves almacenadas.
document.getElementById("idBtnBorrarClaves").addEventListener("click",function(event){
    event.preventDefault();  
    sweetBtn.mostrarAlerta();
});