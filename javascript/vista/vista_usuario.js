const boton = document.querySelector('#boton');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const usuario = document.querySelector('#usuario');
const genero = document.querySelector('#genero');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const foto = document.querySelector('#foto');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');

const generarUsuario = async () => {
    //consultar a la API
    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();
    const datos = results[0];

    foto.src = datos.picture.medium;
    nombre.value = datos.name.first;
    apellido.value = datos.name.last;
    usuario.value = datos.login.username;
    correo.value = datos.email;
    telefono.value = datos.phone;
    if (datos.value ==='male'){
        genero.value = 'Hombre';
    } else {
        genero.value = 'Mujer';
    }
    ciudad.value = datos.location.city;
    pais.value = datos.location.country;
}

//crear un evento
boton.addEventListener('click', generarUsuario);
