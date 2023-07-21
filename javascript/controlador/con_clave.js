import Clave from '../modelo/clave.js';//Me traigo las propiedades y métodos de "Clave".

class Controlador extends Clave {
  
  clave_generada = '';
  //Creo la funcion "validar_longitud".
  validar_longitud = (longitud_clave) => { 

    //Instancio un objeto de tipo Controlador que hereda los métodos de Clave
    const obgValidador = new Controlador();

    /*Ejecuto la función "validarNumeroEntero" con el objeto "claveValida". La función está heredada de la clase "Clave".
    Realizo las validaciones correspondientes.

    1) !claveValida.validarNumeroEntero(longitud_clave) = al negar la función (no se cumple), estoy diciendo que no es un número entero.
    2) longitud_clave == '' = si se cumple, ESTÁ VACÍO.
    3) !Number(longitud_clave) = si se cumple, NO ES UN NÚMERO.*/
    

    try {
      if ((!obgValidador.validarNumeroEntero(longitud_clave) || longitud_clave == '' || !Number(longitud_clave))){
        if (longitud_clave == ''){
          return ('El campo no puede estar vacío.');      
        }
        if (longitud_clave == null) {
          return ('Omitió ingresar un valor.');
        }
        else if (longitud_clave === '0') {
          return 'El valor no puede ser cero';
        }
        else if(!obgValidador.validarNumeroEntero(longitud_clave)){
            return (`No es un número entero, digitó: '${longitud_clave}'`);
        }
      }
      //Cumple con los requisitos anteriores pero no cumple con la longitud.
      else if (longitud_clave<7 || longitud_clave>20){
          return (`La longitud de: '${longitud_clave}' no cumple los requisitos.`);
      }
      //Cumple todos los requisitos
      else{
          /*genero la variable "clave_generada" y ejecuto la función "generarCadenaAleatoria" heredada de "Clave".
          La propiedad "SUPER" se utiliza para llamar a una función desde una clase HIJA (llama función de la clase Padre - Super).*/
        const clave_generada = super.generarCadenaAleatoria(longitud_clave);
        
        return clave_generada;        
      }
    
    } catch (longitud_clave) {
      return 'Error sin validar en Controlador';
    }   
  }

  validar_cantidad_claves = (cantidad) => {
    const obgValidador = new Controlador();
    try {
      if ((!obgValidador.validarNumeroEntero(cantidad) || cantidad == '' || !Number(cantidad))){
        if (cantidad == '' || cantidad == null){
          return ('El valor ingresado no es válido.');  
        }
        else if (cantidad === '0') {
          return 'El valor no puede ser cero';
        }
        else if(!obgValidador.validarNumeroEntero(cantidad)){
            return (`Valor invalido, digitó: '${cantidad}', ingrese nuevamente un número.`);
        }
      }
      //Cumple todos los requisitos
      else{
        return true;
      }
    
    } catch (cantidad) {
      return 'Error sin validar en Controlador';
    }   
  }
  
  

  mostrarClaves = () => {
    const errorModal = document.getElementById("error-modal");
    errorModal.innerHTML = ""; // Limpio el contenido previo del modal (del error).
    // Obtener el array de claves almacenado en el localStorage
    const jsonClavesParseado = localStorage.getItem("arrayClaves");
    // Convertir el JSON a un array de objetos
    const todasLasClaves = JSON.parse(jsonClavesParseado);

    let numerosLista = document.getElementById("numeros-lista");
    numerosLista.innerHTML = ""; // Limpiar la lista antes de agregar las claves

    // Recorrer el array de claves obtenido del localStorage
    todasLasClaves.forEach((claveObj) => {
        const numeroItem = document.createElement("li");
        numeroItem.textContent = claveObj.clave;
        numerosLista.appendChild(numeroItem);
    });

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    let lastID = parseInt(localStorage.getItem("lastID"));//Obtengo el id 0
    if (lastID === 0) {
      const numeroItem = document.createElement("p");
      numeroItem.innerHTML = `En el sistema, no hay claves almacenadas.<br>
                              Deberá generar nuevas claves!!! 
                              &#128517; `;
      numerosLista.appendChild(numeroItem);
    }
    modal.show();
}


  

}
export default Controlador;//Exporto la clase "Controlador"
