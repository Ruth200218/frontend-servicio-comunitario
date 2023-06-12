import { RUTA } from "./global.js";

const cleanInputs = () => {
  const cedula = (document.querySelector("#username").value = "");
  const clave = (document.querySelector("#password").value = "");
  const nombre = (document.querySelector("#name").value = "");
  const apellido = (document.querySelector("#appe").value = "");
  const correo = (document.querySelector("#mail").value = "");
  const telefono = (document.querySelector("#tlf").value = "");
  const direccion = (document.querySelector("#dire").value = "");
  const carreraID = (document.querySelector("#pnf").value = "");
  const tutorID = (document.querySelector("#tutor").value = "");
  const servicioTitulo = (document.querySelector("#nameServicio").value = "");
  const servicioInicio = (document.querySelector("#fechaServicio").value = "");
};

export function registroFetchPost(objSend) {
  const url = `${RUTA}/Authentication/Register`;

  console.log(url);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(objSend),
  };

  console.log(requestOptions);
  console.log(objSend);

  // Realizar la solicitud POST
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      /* console.log(data);
      console.log("Usuario registrado: " + data[0].user.cedula); */
      alert("Usuario registrado: " + data[0].user.cedula);

      cleanInputs();
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}
