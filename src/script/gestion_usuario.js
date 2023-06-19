import { AllEstudents } from "./utils/fetchGet.js";
import { RUTA } from "./utils/global.js";

const token = localStorage.getItem("TOKEN");
console.log(token);
console.log(AllEstudents);

let arrayEstudents = AllEstudents;
const usersContainer = document.querySelector("#contenedor-usuarios");

arrayEstudents = arrayEstudents.sort((a, b) => {
  a.user.nombre.localeCompare(b.user.nombre);
});

const newArray = arrayEstudents.filter((estudiante) => {
  return (
    estudiante.user.roleId == 2 &&
    new Date(estudiante.servicio.fechaFin).getMonth() ==
      new Date(estudiante.servicio.fechaInicio).getMonth() + 1
  );
});

newArray.forEach((estudiante) => {
  if (
    estudiante.user.roleId == 2 &&
    new Date(estudiante.servicio.fechaFin).getMonth() ==
      new Date(estudiante.servicio.fechaInicio).getMonth() + 1
  ) {
    const ci = estudiante.user.cedula;
    const name = estudiante.user.nombre;
    const lastname = estudiante.user.apellido;
    const id = estudiante.id;

    usersContainer.innerHTML += `
      <tr>
        <td>
          <p>
            ${ci}
          </p>
        </td>
        <td>
          <label for="${id}">
            ${name} ${lastname}
          </label>
        </td>
        <td>
          <p>
            <input type='radio' id="${id}" value="select-${id}" name="users"/>
          </p>
        </td>
      </tr>
      `;
  }
});

// contador
const contador = (obj) => {
  let myUsers = 0;

  obj.forEach((estudiante) => {
    if (
      estudiante.user.roleId == 2 &&
      new Date(estudiante.servicio.fechaFin).getMonth() ==
        new Date(estudiante.servicio.fechaInicio).getMonth() + 1
    ) {
      myUsers++;
    }
  });

  let userSpan = document.querySelector("#userSpan");
  userSpan.innerHTML += "<h3>" + myUsers + "</h3>";
};

contador(arrayEstudents);

//
//
//
//
//
//
//
//
//
//
//
//
// Insertar tutores y carreras
const tutoresContainer = document.querySelector("#tutor");
const pnfContainer = document.querySelector("#pnf");

const urlTutores = `${RUTA}/Tutor`;
const objTutores = fetch(urlTutores)
  .then((response) => response.json())
  .then((data) => {
    insertarTutores(data);
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

//
//
//
// Verificacion de checkbox para edit
const verificacionEdit = (obj) => {

  // validacion();


  let id;
  let label;
  const AllUsers = AllEstudents;

  const arrChecked = [];

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].checked) {
      arrChecked.push(obj[i]);
    }
  }

  if (arrChecked.length == 1) {
    arrChecked.forEach((checked) => {
      id = checked.value.replace("select-", "");
      label = document.querySelector(`label[for="${id}"]`);
    });

    AllUsers.forEach((estudiante) => {
      if (estudiante.id == id) {
        let { cedula, nombre, apellido, correo, telefono, direccion } = estudiante.user;
        let carreraId = estudiante.carrera.id;
        let tutorId = estudiante.tutor.id;
        let servicioId = estudiante.servicio.id;
        let { fechaInicio, fechaFin } = estudiante.servicio;

        const cedulaInput = (document.querySelector("#username").value = cedula);
        const nombreInput = (document.querySelector("#name").value = nombre);
        const apellidoInput = (document.querySelector("#appe").value = apellido);
        const correoInput = (document.querySelector("#mail").value = correo);
        const telefonoInput = (document.querySelector("#tlf").value = telefono);
        const direccionInput = (document.querySelector("#dire").value = direccion);
        const carreraIdInput = (document.querySelector( "#pnf" ).value = `pnf-${carreraId}`);
        const tutorIdInput = (document.querySelector( "#tutor" ).value = `tutor-${tutorId}`);
        const servicioIdInput = (document.querySelector("#servicioId").value = servicioId);
        const servicioTituloInput = (document.querySelector( "#nameServicio" ).value = estudiante.servicio.titulo);
        const servicioInicioInput = (document.querySelector( "#fechaServicio" ).value = fechaInicio.slice(0, fechaInicio.indexOf("T")));
        const servicioFinInput = (document.querySelector( "#fechaServicioFin" ).value = fechaFin.slice(0, fechaInicio.indexOf("T")));
      }
    });

    const container = document.querySelector("#overlay1");
    container.classList.remove("disable");

    const btnPut = document.querySelector(".edit");
    const btnNoPut = document.querySelector(".noEdit");

    btnPut.addEventListener("click", (e) => {
      e.preventDefault();

      const cedula = document.querySelector("#username").value;
      const nombre = document.querySelector("#name").value;
      const apellido = document.querySelector("#appe").value;
      const correo = document.querySelector("#mail").value;
      const telefono = document.querySelector("#tlf").value;
      const direccion = document.querySelector("#dire").value;
      const carreraId = document.querySelector("#pnf").value.replace("pnf-", "");
      const tutorId = document.querySelector("#tutor").value.replace("tutor-", "");
      const servicioId = document.querySelector("#servicioId").value;
      const titulo = document.querySelector("#nameServicio").value;
      const fechaInicio = document.querySelector("#fechaServicio").value;
      const fechaFin = document.querySelector("#fechaServicioFin").value;

      const objUser = {
        id,
        // cedula,
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
      };

      const objServicio = {
        servicioId,
        titulo,
        fechaInicio,
        fechaFin,
      };

      const objEstudiante = {
        id,
        servicioId,
        tutorId: parseInt(tutorId),
        carreraId: parseInt(carreraId)
      };

      sendEdit(objUser, objServicio, objEstudiante);
    });

    btnNoPut.addEventListener("click", (e) => {
      e.preventDefault();
      closeW();
    });
  }
};

//
//
//
// cierre de la ventana de edit y delete
const closeW = () => {
  const container1 = document.querySelector("#overlay1");
  container1.classList.add("disable");
  document.querySelector(".nombres").innerHTML = "";
};

setTimeout(() => {
  const btnEdit = document.querySelector("#editSelect");
  const checkboxes = document.querySelectorAll('input[type="radio"]');
  btnEdit.addEventListener("click", () => verificacionEdit(checkboxes));
}, 500);

//
//
//
//
//
//
//
const sendEdit = async (user, servicios, estudiante) => {
  let valorUser = false;
  let valorServicios = false;
  let valorEstudiante = false;

  try {
    const responseUser = await fetch(`${RUTA}/Usuario/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token-x": token,
      },
      body: JSON.stringify(user),
    });

    if (!responseUser.status === 200) {
      throw new Error("Error al editar el usuario");
    }

    valorUser = true;
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const responseServicios = await fetch(`${RUTA}/Servicio/${servicios.servicioId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token-x": token,
        },
        body: JSON.stringify(servicios),
      }
    );

    if (!responseServicios.status === 200) {
      throw new Error("Error al editar el Servicio");
    }

    valorServicios = true;
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const responseEstudiante = await fetch(`${RUTA}/Estudiante`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token-x": token,
        },
        body: JSON.stringify(estudiante),
      }
    );

    if (!responseEstudiante.status === 200) {
      throw new Error("Error al editar el usuario");
    }

    valorEstudiante = true;
  } catch (error) {
    console.error("Error:", error);
  }

  // console.log(estudiante);

  if (valorUser && valorServicios && valorEstudiante) {
    alert("Todos los valores se actualizaron correctamente.");
  } else {
    alert(
      "Es posible que algunos o ninguno de los datos se hayan actualizado correctamente. Por favor, verifique."
    );
  }

  location.reload();
};

// search

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredUsers = newArray.filter((usuario) => {
    const nombreCompleto =
      `${usuario.user.nombre} ${usuario.user.apellido}`.toLowerCase();
    return nombreCompleto.includes(searchTerm);
  });

  displayResults(filteredUsers);
});

function displayResults(users) {
  usersContainer.innerHTML = "";

  users.forEach((estudiante) => {
    if (estudiante.user.roleId == 2) {
      const ci = estudiante.user.cedula;
      const name = estudiante.user.nombre;
      const lastname = estudiante.user.apellido;
      const id = estudiante.id;
      usersContainer.innerHTML += `
      <tr>
        <td>
          <p>
            ${ci}
          </p>
        </td>
        <td>
          <label for="${id}">
            ${name} ${lastname}
          </label>
        </td>
        <td>
          <p>
            <input type='radio' id="${id}" value="select-${id}" name="users"/>
          </p>
        </td>
      </tr>
      `;
    }
  });
}









// const validacion = () => {
//   e.preventDefault();

//   let username = document.querySelector("#username").value;
//   let name = document.querySelector("#name").value;
//   let appe = document.querySelector("#appe").value;
//   let tlf = document.querySelector("#tlf").value;
//   let mail = document.querySelector("#mail").value;
//   let dire = document.querySelector("#dire").value;
//   let nameServicio = document.querySelector("#nameServicio").value;
//   let fechaServicio = document.querySelector("#fechaServicio").value;

//   // Validación de campos requeridos
//   if (
//     !username ||
//     !name ||
//     !appe ||
//     !tlf ||
//     !mail ||
//     !dire ||
//     !nameServicio ||
//     !fechaServicio
//   ) {
//     alert("Por favor, complete todos los campos.");
//     return;
//   }
//   // Validación de longitud de cédula
//   if (username.length < 6 || username.length > 8) {
//     alert("La cédula debe tener entre 6 y 8 caracteres.");
//     return;
//   }

//   // Validación de longitud de teléfono
//   if (tlf.length !== 11) {
//     alert("El teléfono debe tener exactamente 11 dígitos.");
//     return;
//   }

//   // Validación de username y tlf como números
//   if (isNaN(username) || isNaN(tlf)) {
//     alert("El campo cedula y teléfono deben ser números.");
//     return;
//   }
  
//   // Validación de longitud de nombre y apellido
//   if (name.length < 3 || name.length > 10 || appe.length < 3 || appe.length > 10) {
//     alert("El nombre y el apellido deben tener entre 3 y 10 caracteres.");
//     return;
//   }

//   // Validación de longitud de dirección y nombre del servicio comunitario
//   if (dire.length > 64 || nameServicio.length > 64) {
//     alert(
//       "La dirección y el nombre del servicio comunitario deben tener un máximo de 64 caracteres."
//     );
//     return;
//   }

//   // Validación de campos que deben ser letras
//   const camposLetras = [name, appe, dire, nameServicio];

//   const regexLetras = /[A-Za-zÁÉÍÓÚÑáéíóúñ]/;

//   for (let campo of camposLetras) {
//     if (!regexLetras.test(campo)) {
//       alert("Verifica que los datos estén escritos en el formato correspondiente a su campo");
//       return;
//     }
//   }

//   // Validación de longitud de correo electrónico
//   if (mail.length > 24) {
//     alert("El correo electrónico debe tener un máximo de 24 caracteres.");
//     return;
//   }

//   // Validación de correo electrónico
//   const regexEmail = /^[\w.-]+@[\w.-]+\.[\w]{2,}$/;

//   if (!regexEmail.test(mail)) {
//     alert("Ingrese un correo electrónico válido.");
//     return;
//   }

//   // Validación de clave
//   const password = document.querySelector("#password").value;
//   const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@-_])[A-Za-z\d@-_]{8,16}$/;

//   if (!regexPassword.test(password)) {
//     alert("La clave debe tener entre 8 y 16 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial (@, -, _).");
//     return;
//   }

//   // Si todas las validaciones pasan, puedes realizar alguna acción adicional aquí
//   console.log("Formulario válido");
// }