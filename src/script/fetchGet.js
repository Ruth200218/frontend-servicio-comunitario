import { RUTA } from "../script/global.js";

export async function fetchGet(extension) {
  const url = `${RUTA}${extension}`;

  // console.log(url);

  try {
    const response = await fetch(url);

    if (!response.status == 200) {
      throw new Error("Error en la solicitud"); // Lanzar un error si la respuesta no es exitosa
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error); // Manejar el error de la solicitud
    throw error; // Lanzar el error para que sea manejado por el consumidor de la función
  }
}

let AllEstudentsGet = fetchGet("/Estudiante");
export const AllEstudents = await AllEstudentsGet;
