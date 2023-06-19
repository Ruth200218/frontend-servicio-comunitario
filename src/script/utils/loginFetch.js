import { RUTA } from "./global.js";

let TOKEN;
localStorage.clear();

const cleanInputs = () => {
  const cedula = (document.querySelector("#ciLogin").value = "");
  const clave = (document.querySelector("#passwordLogin").value = "");
};

export function loginFetchPost(objSend) {
  const url = `${RUTA}/Authentication/Login`;

  // console.log(url);

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
    .then((res) => res.json())
    .then((data) => {
      TOKEN = data.token;
      alert("Login exitoso.");
      console.log("Data:", data);
      console.log("Token:", TOKEN);
      console.log("Usuario", data.usuario);
      localStorage.setItem("TOKEN", TOKEN);
      cleanInputs();

      if (data.usuario.roleId == 2) {
        window.location.href = "student.html";
      } else if (data.usuario.roleId == 1) {
        window.location.href = "admin.html";
      }
    })
    .catch((err) => {
      console.error("Error en la solicitud:", err);
      alert("Clave o usuario erroneo. Intente otra vez.");
      cleanInputs();
    });
}
