// Obtener el parámetro del nombre del invitado de la URL
const urlParams = new URLSearchParams(window.location.search);
const invitadoNombre = urlParams.get('invitado');

// Cargar el archivo JSON de invitados
fetch('archivo.json')
  .then(response => response.json())
  .then(data => {
    const detallesContainer = document.getElementById('detalles');
    const invitado = data.invitados.find(i => i.nombre === invitadoNombre);

    if (invitado) {
      const detallesDiv = document.createElement('div');
      detallesDiv.className = 'invitado-details-card';
      detallesDiv.innerHTML = `
      <p>Es un placer que puedas acompañarnos en este dia tan especial para nosotros</p>
      <h4>Invitad@</h4>
        <h3>${invitado.nombre}</h3>
        <p>Acompañantes: ${invitado.acompañantes}</p>
      `;
      detallesContainer.appendChild(detallesDiv);
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = 'Invitado no encontrado.';
      detallesContainer.appendChild(errorDiv);
    }
  })
  .catch(error => console.error('Error al cargar los datos:', error));
