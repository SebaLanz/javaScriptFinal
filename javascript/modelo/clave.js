
class Clave {

  generarCadenaAleatoria(longitud) {
      let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&/()';//Caracteres que pueden estar disponible en la generación de clave.
      let cadenaAleatoria = '';//declaro la cadena que se va a generar.
      //el ver va desde 0 hasta que i sea menor a longitud.
      for (let i = 0; i < longitud; i++) {
          let indice = Math.floor(Math.random() * caracteres.length);
          cadenaAleatoria += caracteres.charAt(indice);//charAt devuelve el caracter e indice le dice el número random generado. Lo voy concatenando a cadenaAleatoria.
      }    
    return cadenaAleatoria;
  }
  /*Esta función devuelve 2 valores posibles. True o False.
  True = números del 0 al 9
  False = No son números*/
  validarNumeroEntero = (valor) => {
    let regex = /^\d+$/;
    return regex.test(valor);
  }
}

export default Clave;//Exporto la clase "Clave"
