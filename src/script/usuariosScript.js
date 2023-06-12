import { AllEstudents } from "./fetchGet.js";
import { RUTA } from "./global.js";

const token = localStorage.getItem("TOKEN");
console.log(token);
console.log(AllEstudents);

let arrayEstudents = AllEstudents;
const usersContainer = document.querySelector("#contenedor-usuarios");

arrayEstudents = arrayEstudents.sort((a, b) => {
  a.user.nombre.localeCompare(b.user.nombre);
});

arrayEstudents.forEach((estudiante) => {
  if (estudiante.user.roleId == 2) {
    const ci = estudiante.user.cedula;
    const name = estudiante.user.nombre;
    const lastname = estudiante.user.apellido;
    const id = estudiante.userId;

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
    if (estudiante.user.roleId == 2) {
      myUsers++;
    }
  });

  let userSpan = document.querySelector("#userSpan");
  userSpan.innerHTML += "<h3>" + myUsers + "</h3>";
};

contador(arrayEstudents);

// Verificacion de checkbox para delete
// const verificacionDelete = (obj) => {
//   const arrChecked = [];

//   for (let i = 0; i < obj.length; i++) {
//     if (obj[i].checked) {
//       arrChecked.push(obj[i]);
//     }
//   }

//   if (arrChecked.length > 0) {
//     arrChecked.forEach((checked) => {
//       let id = checked.value.replace("select-", "");
//       let label = document.querySelector(`label[for="${id}"]`);

//       document.querySelector(".nombres").innerHTML += `
//       <li>${label.textContent.trim()}</li>
//       `;
//     });

//     const container = document.querySelector("#overlay2");
//     container.classList.remove("disable");

// const btnDelete = document.querySelector(".delete");
// const btnNoDelete = document.querySelector(".noDelete");

// btnDelete.addEventListener("click", () => sendDelete(arrChecked));
// btnNoDelete.addEventListener("click", closeDelete);

// console.log(arrChecked[1].id);
//   }
// };

// const sendDelete = (array) => {
//   for (let i = 0; i < array.length; i++) {
//     fetch(`${RUTA}/Estudiante/${array[i].id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "token-x": token,
//       },
//     })
//       .then((response) => {
//         if (!response.status == 200) {
//           alert("Error al eliminar el usuario");
//           throw new Error("Error al eliminar el usuario");
//         } else {
//           alert(`Usuario eliminado exitosamente`);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }

//   closeW();
//   location.reload();
// };

// Verificacion de checkbox para edit
const verificacionEdit = (obj) => {
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
      if (estudiante.userId == id) {
        let { cedula, nombre, apellido, correo, telefono, direccion } =
          estudiante.user;
        let carreraId = estudiante.carrera.id;
        let tutorId = estudiante.tutor.id;
        let servicioId = estudiante.servicio.id;
        let { fechaInicio, fechaFin } = estudiante.servicio;

        const cedulaInput = (document.querySelector("#username").value =
          cedula);
        const nombreInput = (document.querySelector("#name").value = nombre);
        const apellidoInput = (document.querySelector("#appe").value =
          apellido);
        const correoInput = (document.querySelector("#mail").value = correo);
        const telefonoInput = (document.querySelector("#tlf").value = telefono);
        const direccionInput = (document.querySelector("#dire").value =
          direccion);
        const carreraIdInput = (document.querySelector(
          "#pnf"
        ).value = `pnf-${carreraId}`);
        const tutorIdInput = (document.querySelector(
          "#tutor"
        ).value = `tutor-${tutorId}`);
        const servicioIdInput = (document.querySelector("#servicioId").value =
          servicioId);
        const servicioTituloInput = (document.querySelector(
          "#nameServicio"
        ).value = estudiante.servicio.titulo);
        const servicioInicioInput = (document.querySelector("#fechaServicio").value = fechaInicio.slice(0, fechaInicio.indexOf("T")));
        const servicioFinInput = (document.querySelector("#fechaServicioFin").value = fechaFin.slice(0, fechaInicio.indexOf("T")));
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
      const carreraId = document.querySelector("#pnf").value.replace("pnf-", "");;
      const tutorId = document.querySelector("#tutor").value.replace("tutor-", "");;
      const servicioId = document.querySelector("#servicioId").value;
      const titulo = document.querySelector("#nameServicio").value;
      const fechaInicio = document.querySelector("#fechaServicio").value;
      const fechaFin = document.querySelector("#fechaServicioFin").value;

      const objUser = {
        id,
        cedula,
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
        tutorId,
        servicioId,
        carreraId,
      };

      console.log(objEstudiante);

      sendEdit(objUser, objServicio, objEstudiante);
    });
    btnNoPut.addEventListener("click", (e) => {
      e.preventDefault();
      closeW();
    });

    console.log(arrChecked[0].id);
  }
};

// cierre de la ventana de edit y delete
const closeW = () => {
  // const container2 = document.querySelector("#overlay2");
  // container2.classList.add("disable");

  const container1 = document.querySelector("#overlay1");
  container1.classList.add("disable");
  document.querySelector(".nombres").innerHTML = "";
};

setTimeout(() => {
  // const btnDelete = document.querySelector("#deleteSelect");
  // btnDelete.addEventListener("click", () => verificacionDelete(checkboxes));

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
//
//
//
//
//
//

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

const tutoresContainer = document.querySelector("#tutor");
const pnfContainer = document.querySelector("#pnf");

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
    console.log("Usuario editado exitosamente");
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const responseServicios = await fetch(`${RUTA}/Servicio/${servicios.servicioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token-x": token,
      },
      body: JSON.stringify(servicios),
    });

    if (!responseServicios.status === 200) {
      throw new Error("Error al editar el Servicio");
    }

    valorServicios = true;
    console.log("Servicio editado exitosamente");
  } catch (error) {
    console.error("Error:", error);
  }

  const objEstudiante = {
    id: estudiante.id,
    servicioId: estudiante.servicioId,
    tutorId: estudiante.tutorId,
    carreraId: estudiante.carreraId,
  };

  console.log(objEstudiante);

  // try {
  //   const responseEstudiante = await fetch(`${RUTA}/Estudiante`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "token-x": token,
  //     },
  //     body: JSON.stringify(objEstudiante),
  //   });

  //   if (!responseEstudiante.status === 200) {
  //     throw new Error("Error al editar los datos del estudiante");
  //   }

  //   valorEstudiante = true;
  //   console.log("Datos de estudiante actualizados exitosamente");
  // } catch (error) {
  //   console.error("Error:", error);
  // }

  if (valorUser || valorServicios) {
    alert("Todos los valores se actualizaron correctamente.");
  } else {
    alert("Es posible que algunos o ninguno de los datos se hayan actualizado correctamente. Por favor, verifique.");
  }

  location.reload();
};



// search

const searchInput = document.getElementById('searchInput');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredUsers = arrayEstudents.filter(usuario => {
      const nombreCompleto = `${usuario.user.nombre} ${usuario.user.apellido}`.toLowerCase();
      return nombreCompleto.includes(searchTerm);
    });
  
    displayResults(filteredUsers);
  });
  
  function displayResults(users) {
    usersContainer.innerHTML = '';

    users.forEach((estudiante) => {
      if (estudiante.user.roleId == 2) {
        const ci = estudiante.user.cedula;
        const name = estudiante.user.nombre;
        const lastname = estudiante.user.apellido;
        const tlf = estudiante.user.telefono;
        const email = estudiante.user.correo;
        const adress = estudiante.user.direccion;
        usersContainer.innerHTML +=
          "<tr><td><p>" +
          ci +
          "</p></td><td><p>" +
          name +
          " " +
          lastname +
          "</p></td><td><p>" +
          tlf +
          "</p></td><td><p>" +
          email +
          "</p></td><td><p>" +
          adress +
          "</p></td></tr>";
      }
    });
  }
  