import { AllEstudents } from "./utils/fetchGet.js";

import { RUTA } from "./utils/global.js";
const token = localStorage.getItem("TOKEN");

let arrayEstudents = AllEstudents;
const usersContainer = document.querySelector("#contenedor-usuarios");

arrayEstudents = arrayEstudents.sort((a, b) => {
  a.user.nombre.localeCompare(b.user.nombre);
});

arrayEstudents.forEach((estudiante) => {
  if (
    estudiante.user.roleId == 2 &&
    new Date(estudiante.servicio.fechaFin).getMonth() ==
      new Date(estudiante.servicio.fechaInicio).getMonth() + 1
  ) {
    const id = estudiante.userId;
    const nroServicio = estudiante.servicio.id;
    const cedula = estudiante.user.cedula;
    const nombre = estudiante.user.nombre;
    const apellido = estudiante.user.apellido;
    const titulo = estudiante.servicio.titulo;

    usersContainer.innerHTML += `
    <tr>
        <td>
            <p>
                ${cedula}
            </p>
        </td>
        <td>
            <label for="${id}">${nombre} ${apellido} </label>
        </td>
        <td>
            <p>
                ${titulo}
            </p>
        </td>
        <td>
            <button class="listener" name="servicio-${nroServicio}" id="servicio-${id}">
                Calificar
            </button>
        </td>
    </tr>
  `;
  }
});

//
// search
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredUsers = arrayEstudents.filter((usuario) => {
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

//
//
//
// listener para manejar options
const showInterface = () => {
  document.querySelector("#interface").classList.toggle("invisible");
};

let calificar = document.querySelectorAll(".listener");

calificar.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const selectedId = e.target.name.replace("servicio-", "");

    showInterface(e);

    const btnAprobar = document.querySelector(".aprobar");
    btnAprobar.addEventListener("click", () => aprobarEstudiante(selectedId));

    const btnReprobar = document.querySelector(".reprobar");
    btnReprobar.addEventListener("click", () => reprobarEstudiante(selectedId));

    const cerrarVentana = document.querySelector(".cancelar");
    cerrarVentana.addEventListener("click", showInterface);

    console.log("selectedId:", selectedId);
    console.log("Ruta:", `${RUTA}/Servicio/${selectedId}`);
  });
});

const aprobarEstudiante = (id) => {
  const valorFechaFin = document.querySelector("#interfaceDate").value;

  console.log(valorFechaFin);

  fetch(`${RUTA}/Servicio/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token-x": token,
    },
    body: JSON.stringify({
      fechaFin: valorFechaFin,
      estado: true,
    }),
  })
    .then((response) => {
      if (!response.status == 200) {
        alert("Error al editar el usuario");
        throw new Error("Error al aditar el usuario");
      }
      alert("Usuario editado exitosamente");
      console.log("Usuario editado exitosamente");
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  location.reload();
};

const reprobarEstudiante = (id) => {
  const valorFechaFin = document.querySelector("#interfaceDate").value;

  console.log(valorFechaFin);

  fetch(`${RUTA}/Servicio/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token-x": token,
    },
    body: JSON.stringify({
      fechaFin: valorFechaFin,
      estado: false,
    }),
  })
    .then((response) => {
      if (!response.status == 200) {
        alert("Error al editar el usuario");
        throw new Error("Error al aditar el usuario");
      }
      alert("Usuario editado exitosamente");
      console.log("Usuario editado exitosamente");
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  location.reload();
};
