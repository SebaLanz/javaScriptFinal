import Controlador from '../controlador/con_clave.js';//Me traigo las propiedades y métodos de "Clave".
const objCantidad = new Controlador();//Utilizo el obj para validar número entero.

class SweetAlert {

    //Alerta para eliminar el localstore.
    borrarContenidoAlerta = () => {
        Swal.fire({
        title: 'Contraseñas eliminadas',
        icon: 'success',
        text: 'Todas las contraseñas almacenadas han sido eliminadas.',
        confirmButtonText: 'Aceptar'
        });
        //Vacío el localStorage.
        localStorage.clear();
        /*Si no hay datos en el localStorage, no me abre el modal vacío de "mostrar claves".
        Entonces, genero un array vacío, para que se muestre el modal sin datos.*/
        const jsonClavesParseado = localStorage.getItem("arrayClaves");
        if (!jsonClavesParseado) {
            localStorage.setItem("arrayClaves", "[]");
            localStorage.setItem("lastID", "0");
        }
    }
    //Alerta que arroja si quiero vaciar el local y ya se encuentra vacío.
    sinDatosAlert = () => {
        Swal.fire({
            title: 'Upss...',
            text: 'No hay claves almacenadas para poder eleminar!!',
            icon: 'warning',
        })
    }
    //Alerta la cual reemplaza el prompt, la utilizo para pedir la longitud de cada clave.
    async solicitarNumero() {
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
                const numeroIngresado = parseFloat(value);
                // Valido si es una letra, menor a 7 o mayor a 7.
                if (isNaN(numeroIngresado) || numeroIngresado < 7 || numeroIngresado > 20) {
                    if (isNaN(numeroIngresado)) {
                        return `Valor inválido, no ingresó un número.`;//ingresa letras, caracteres.
                    }else{
                        return `Valor inválido, ingresó: ${numeroIngresado} `;//Ingresa 0 (cero)
                    }
                }
                else{
                    //Acá ya es un número el valor ingresado, pero si entra al IF, es un número con decimales.
                    if(objCantidad.validarNumeroEntero(numeroIngresado) === false ) {
                        return `El número debe ser entero, ingresó: ${numeroIngresado} `;//Ingresa números con decimales
                    }
                }
            }
        });
        if (result.isConfirmed) {
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500 // 3 segundos y medio.
            }).fire({
                icon: 'success',
                title: 'Claves generadas exitosamente!!.'
            });
            // Convierto el valor en un entero y retorno el valor ingresado, el cual cumple todas las restricciones.
            return +result.value;
        } else {
            return null; // Si se cancela, devuelve null (msj: imitió ingresar valor).
        }
    }    
}
export default SweetAlert;