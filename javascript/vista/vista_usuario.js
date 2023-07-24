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
    nombre.textContent = datos.name.first;
    apellido.textContent = datos.name.last;
    usuario.textContent = datos.login.username;
    correo.textContent = datos.email;
    telefono.textContent = datos.phone;
    if (datos.gender ==='male'){
        genero.textContent = 'Hombre';
    }else{
        genero.textContent = 'Mujer';
    }
    ciudad.textContent = datos.location.city;
    pais.textContent = datos.location.country;
}


//crear un evento
document.addEventListener('DOMContentLoaded', generarUsuario);
boton.addEventListener('click', generarUsuario);