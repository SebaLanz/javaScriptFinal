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

}
export default SweetAlert;