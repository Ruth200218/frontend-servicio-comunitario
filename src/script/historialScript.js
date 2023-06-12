

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
  