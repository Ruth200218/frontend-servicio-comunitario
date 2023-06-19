import { registroFetchPost } from "./utils/registroFetch.js";
import { RUTA } from "./utils/global.js";

const tutoresContainer = document.querySelector("#tutor");
const pnfContainer = document.querySelector("#pnf");
const formRegister = document.querySelector("#formRegister");

const urlTutores = `${RUTA}/Tutor`;
const objTutores = fetch(urlTutores)
  .then((response) => response.json())
  .then((data) => {
    insertarTutores(data);
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const insertarTutores = (obj) => {
  obj.sort((a, b) => a.nombre.localeCompare(b.nombre));
  obj.forEach((user) => {
    const nombre = user.nombre;
    const apellido = user.apellido;
    const id = user.id;
    tutoresContainer.innerHTML += `<option value="tutor-${id}">Prof. ${nombre} ${apellido}</option>`;
  });
};

const urlPnf = `${RUTA}/Carrera`;
const objPnf = fetch(urlPnf)
  .then((response) => response.json())
  .then((data) => {
    insertarPnf(data);
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const insertarPnf = (obj) => {
  obj.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
  obj.forEach((pnf) => {
    const id = pnf.id;
    const descripcion = pnf.descripcion;
    pnfContainer.innerHTML += `<option value="pnf-${id}">${descripcion}</option>`;
  });
};

const validarFormulario = function (e) {
  e.preventDefault();

  let username = document.querySelector("#username").value;
  let name = document.querySelector("#name").value;
  let appe = document.querySelector("#appe").value;
  let tlf = document.querySelector("#tlf").value;
  let mail = document.querySelector("#mail").value;
  let dire = document.querySelector("#dire").value;
  let nameServicio = document.querySelector("#nameServicio").value;
  let fechaServicio = document.querySelector("#fechaServicio").value;

  // Validación de campos requeridos
  if (
    !username ||
    !name ||
    !appe ||
    !tlf ||
    !mail ||
    !dire ||
    !nameServicio ||
    !fechaServicio
  ) {
    alert("Por favor, complete todos los campos.");
    return;
  }
  // Validación de longitud de cédula
  if (username.length < 6 || username.length > 8) {
    alert("La cédula debe tener entre 6 y 8 caracteres.");
    return;
  }

  // Validación de longitud de teléfono
  if (tlf.length !== 11) {
    alert("El teléfono debe tener exactamente 11 dígitos.");
    return;
  }

  // Validación de username y tlf como números
  if (isNaN(username) || isNaN(tlf)) {
    alert("El campo cedula y teléfono deben ser números.");
    return;
  }
  
  // Validación de longitud de nombre y apellido
  if (name.length < 3 || name.length > 10 || appe.length < 3 || appe.length > 10) {
    alert("El nombre y el apellido deben tener entre 3 y 10 caracteres.");
    return;
  }

  // Validación de longitud de dirección y nombre del servicio comunitario
  if (dire.length > 64 || nameServicio.length > 64) {
    alert(
      "La dirección y el nombre del servicio comunitario deben tener un máximo de 64 caracteres."
    );
    return;
  }

  // Validación de campos que deben ser letras
  const camposLetras = [name, appe, dire, nameServicio];

  const regexLetras = /[A-Za-zÁÉÍÓÚÑáéíóúñ]/;

  for (let campo of camposLetras) {
    if (!regexLetras.test(campo)) {
      alert("Verifica que los datos estén escritos en el formato correspondiente a su campo");
      return;
    }
  }

  // Validación de longitud de correo electrónico
  if (mail.length > 24) {
    alert("El correo electrónico debe tener un máximo de 24 caracteres.");
    return;
  }

  // Validación de correo electrónico
  const regexEmail = /^[\w.-]+@[\w.-]+\.[\w]{2,}$/;

  if (!regexEmail.test(mail)) {
    alert("Ingrese un correo electrónico válido.");
    return;
  }

  // Validación de clave
  const password = document.querySelector("#password").value;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@-_])[A-Za-z\d@-_]{8,16}$/;

  if (!regexPassword.test(password)) {
    alert("La clave debe tener entre 8 y 16 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial (@, -, _).");
    return;
  }

  // Si todas las validaciones pasan, puedes realizar alguna acción adicional aquí
  console.log("Formulario válido");

  const takeValuesRegistro = () => {
    const cedula = document.querySelector("#username").value;
    const clave = document.querySelector("#password").value;
    const nombre = document.querySelector("#name").value;
    const apellido = document.querySelector("#appe").value;
    const correo = document.querySelector("#mail").value;
    const telefono = document.querySelector("#tlf").value;
    const direccion = document.querySelector("#dire").value;
    const carreraID = document.querySelector("#pnf").value.replace("pnf-", "");
    const tutorID = document
      .querySelector("#tutor")
      .value.replace("tutor-", "");
    const servicioTitulo = document.querySelector("#nameServicio").value;
    const servicioInicio = document.querySelector("#fechaServicio").value;

    registroFetchPost({
      cedula,
      clave,
      nombre,
      apellido,
      correo,
      telefono,
      direccion,
      carreraID: parseInt(carreraID),
      tutorID: parseInt(tutorID),
      servicioTitulo,
      servicioInicio,
    });
  };

  takeValuesRegistro();
};

formRegister.addEventListener("submit", validarFormulario);
