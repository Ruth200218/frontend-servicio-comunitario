import { AllEstudents } from "./utils/fetchGet.js";

let arrayEstudents = AllEstudents;
const usersContainer = document.querySelector("#contenedor-historial");

arrayEstudents = arrayEstudents.sort((a, b) => {
  a.user.nombre.localeCompare(b.user.nombre);
});

const newArray = arrayEstudents.filter((estudiante) => {
  return (
    estudiante.user.roleId == 2 &&
    new Date(estudiante.servicio.fechaFin).getMonth() !==
      new Date(estudiante.servicio.fechaInicio).getMonth() + 1
  );
});

newArray.forEach((estudiante) => {
  if ( estudiante.user.roleId == 2 && new Date(estudiante.servicio.fechaFin).getMonth() !== new Date(estudiante.servicio.fechaInicio).getMonth() + 1 ) {
    const id = estudiante.userId;
    const cedula = estudiante.user.cedula;
    const nombre = estudiante.user.nombre;
    const apellido = estudiante.user.apellido;
    const titulo = estudiante.servicio.titulo;
    const status = estudiante.servicio.estado;
    const fechaInicio = estudiante.servicio.fechaInicio.split("T")[0];
    const fechaFin = estudiante.servicio.fechaFin.split("T")[0];

    usersContainer.innerHTML += `
    <tr>
    <td>
      <p>
        ${cedula}
      </p>
    </td>
    <td>
      <label for="">
        ${nombre} ${apellido}
      </label>
    </td>
    <td>
      <p>
        ${titulo}
      </p>
    </td>
    <td>
      <p>
      ${status ? "Aprobado" : "Reprobado"}
      </p>
    </td>
    <td>
      <p>
        ${fechaInicio}
      </p>
    </td>
    <td>
      <p>
        ${fechaFin}
      </p>
    </td>
  </tr>
  `;
  }
});

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
//
//
//

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
      const id = estudiante.userId;
      const cedula = estudiante.user.cedula;
      const nombre = estudiante.user.nombre;
      const apellido = estudiante.user.apellido;
      const titulo = estudiante.servicio.titulo;
      const status = estudiante.servicio.estado;
      const fechaInicio = estudiante.servicio.fechaInicio.split("T")[0];
      const fechaFin = estudiante.servicio.fechaFin.split("T")[0];
      usersContainer.innerHTML +=`
      <tr>
      <td>
        <p>
          ${cedula}
        </p>
      </td>
      <td>
        <label for="">
          ${nombre} ${apellido}
        </label>
      </td>
      <td>
        <p>
          ${titulo}
        </p>
      </td>
      <td>
        <p>
        ${status ? "Aprobado" : "Reprobado"}
        </p>
      </td>
      <td>
        <p>
          ${fechaInicio}
        </p>
      </td>
      <td>
        <p>
          ${fechaFin}
        </p>
      </td>
    </tr>
    `;
    }
  });
}
