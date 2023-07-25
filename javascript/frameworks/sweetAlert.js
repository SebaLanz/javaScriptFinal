import Controlador from '../controlador/con_clave.js';//Me traigo las propiedades y métodos de "Clave".
const objCantidad = new Controlador();
const obgValidador = new Controlador();
class SweetAlert {

//sweetalert de Error
    errorAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'El valor ingresado no es correcto.'
        });
    }

    borrarContenidoAlerta = () => {
        Swal.fire({
        title: 'Contraseñas eliminadas',
        icon: 'success',
        text: 'Todas las contraseñas almacenadas han sido eliminadas.',
        confirmButtonText: 'Aceptar'
        });
        //const numerosLista = document.getElementById("numeros-lista");
        //numerosLista.innerHTML = "";
        //Vacío el localStorage.
        localStorage.clear();
        // Si no hay datos en el localStorage, no me abre el modal vacío de "mostrar claves".
        // Entonces, genero un array vacío, para que se muestre el modal sin datos.
        const jsonClavesParseado = localStorage.getItem("arrayClaves");
        if (!jsonClavesParseado) {
            localStorage.setItem("arrayClaves", "[]");
            localStorage.setItem("lastID", "0");
        }
    }

    sinDatosAlert = () => {
        Swal.fire({
            title: 'Oops...',
            text: 'No hay claves almacenadas para poder eleminar!!',
            icon: 'warning',
        })
    }

    
    async solicitarNumero () {
        const result = await Swal.fire({
        title: '<h4>Ingrese logitud de clave, mínimo 7 máximo 20</h4>',
        input: 'text',
        inputAttributes: {
            min: 0,
            step: 1
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        allowOutsideClick: false
        });
    
        if (result.isConfirmed) {
        const numeroIngresado = result.value;
        if (numeroIngresado !== undefined) {
            return numeroIngresado;
        }
        }else {
        return null; // Si se cancela, devuelve null
        }
    }

    async  solicitarNumero2() {
        const result = await Swal.fire({
            title: '<h4>Ingrese longitud de clave, mínimo 7 máximo 20</h4>',
            input: 'number',
            inputAttributes: {
                min: 7,
                max: 20,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value || value < 7 || value > 20) {
                    return 'Debes ingresar un número válido entre 7 y 20.';
                }
            }
        });
    
        if (result.isConfirmed) {
            return result.value;
        } else {
            return null; // Si se cancela, devuelve null
        }
    }

    async solicitarNumero3() {
        const result = await Swal.fire({
            title: '<h4>Ingrese longitud de clave, mínimo 7 máximo 20</h4>',
            input: 'number',
            inputAttributes: {
                min: 7,
                max: 20,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            inputValidator: (value) => {
                // Convertir el valor ingresado a un entero
                const numeroIngresado = parseInt(value);
    
                // Validar si el valor ingresado no es un número válido
                if (isNaN(numeroIngresado) || numeroIngresado < 7 || numeroIngresado > 20) {
                    if (isNaN(numeroIngresado)) {
                        return `Valor inválido!!!`;
                    }else{
                    return `Valor inválido, ingresó: ${numeroIngresado}`;
                    }
                }
            }
        });
    
        if (result.isConfirmed) {
            // Convertir el valor ingresado a un entero antes de devolverlo
            return parseInt(result.value);
        } else {
            return null; // Si se cancela, devuelve null
        }
    }  

}
export default SweetAlert;