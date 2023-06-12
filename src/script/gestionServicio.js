import { AllEstudents } from "./fetchGet.js";
import { RUTA } from "./global.js";

const token = localStorage.getItem("TOKEN");
// console.log(token);
// console.log(AllEstudents);

let arrayEstudents = AllEstudents;
const usersContainer = document.querySelector("#contenedor-usuarios");

arrayEstudents = arrayEstudents.sort((a, b) => {
  a.user.nombre.localeCompare(b.user.nombre);
});

arrayEstudents.forEach((estudiante) => {
  const id = estudiante.userId;
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
          <button class="listener" name="${id}" id="${id}">
              Aprobado
          </button>
      </td>
  </tr>
  `;
});

// listener para manejar options
const showInterface = () => {
  document.querySelector("#interface").classList.toggle("invisible");
  console.log("muestra interfaz");


}

let inputEstado = document.querySelectorAll(".listener");

inputEstado.forEach((element) => {
  element.addEventListener("click", (event) => {

    showInterface(event);





  //   const valorCampo = event.target.value;
  //   const selectedId = event.target.id;

  //   let id;
  //   let titulo;
  //   let fechaInicio;
  //   let fechaFin;
  //   let estado;
  //   let objToSend;

  //   // foreach de arrayEstudents
  //   arrayEstudents.forEach((estudiante) => {
  //     if (estudiante.userId == selectedId) {
  //       id = estudiante.servicio.id;
  //       titulo = estudiante.servicio.titulo;
  //       fechaInicio = estudiante.servicio.fechaInicio;
  //       fechaFin = estudiante.servicio.fechaFin;
  //       estado = valorCampo == "true" ? true : false;

  //       objToSend = {
  //         "titulo": titulo,
  //         "fechaInicio": fechaInicio,
  //         "fechaFin": fechaFin,
  //         "estado": estado
  //       };
  //     }
  //   });

  //   console.log("Cambio. Nuevo valor:", valorCampo);
  //   console.log("selectedId:", id);
  //   console.log("Ruta:", `${RUTA}/Servicio/${id}`);
  //   console.log("objToSend:", JSON.stringify(objToSend));

  //   fetch(`${RUTA}/Servicio/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "token-x": token,
  //     },
  //     body: JSON.stringify(objToSend),
  //   })
  //     .then((response) => {
  //       if (!response.status == 200) {
  //         alert("Error al editar el usuario");
  //         throw new Error("Error al aditar el usuario");
  //       }
  //       alert("Usuario editado exitosamente");
  //       console.log("Usuario editado exitosamente");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  
  });
});



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
  