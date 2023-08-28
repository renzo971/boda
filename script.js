fetch('archivo.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const invitadosContainer = document.getElementById('invitados');
    data.invitados.forEach(invitado => {
      const invitadoDiv = document.createElement('div');
      invitadoDiv.className = 'invitado-card';
      invitadoDiv.innerHTML = `
        <h3>${invitado.nombre}</h3>
        <p>Acompañantes: ${invitado.acompañantes}</p>
        <a href="home.html?invitado=${encodeURIComponent(invitado.nombre)}">Ver invitacion</a>
      `;
      invitadosContainer.appendChild(invitadoDiv);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));
