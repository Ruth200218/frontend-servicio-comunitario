import { loginFetchPost } from "./loginFetch.js";

const formLogin = document.querySelector("#formLogin");

const validarFormulario = function (e) {
  e.preventDefault();

  let cedula = document.querySelector("#ciLogin").value;
  let clave = document.querySelector("#passwordLogin").value;

  let errores = [];

  // Validar cédula de identidad
  if (!cedula) {
    alert("El campo cédula de identidad es obligatorio.");
    return;
  } else if (!/^\d+$/.test(cedula)) {
    alert(
      "El campo cédula de identidad solo debe contener caracteres numéricos. Tu usuario es tu cédula."
    );
    return;
  }

  // Validar contraseña
  if (!clave) {
    alert("El campo contraseña es obligatorio.");
    return;
  }

  if (errores.length > 0) {
    // Mostrar mensajes de error
    errores.forEach(function (error) {
      console.log(error);
    });
    return;
  } else {
    // Los datos son válidos, puedes realizar alguna acción
    console.log("Datos válidos");

    loginFetchPost({
      cedula,
      clave,
    });
  }
};

formLogin.addEventListener("submit", validarFormulario);
