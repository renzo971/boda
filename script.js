const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const invitadosContainer = document.getElementById('invitados');

// Cargar el archivo JSON de invitados
fetch('archivo.json')
  .then(response => response.json())
  .then(data => {
    const invitados = data.invitados;

    // Función para mostrar sugerencias en tiempo real
// Función para mostrar sugerencias en tiempo real
function showSuggestions(searchTerm) {
  suggestionsContainer.innerHTML = '';

  if (searchTerm === '') {
    displayInvitadoDetails(invitados)
    return; // No mostrar sugerencias si el campo está vacío
  }

  const filteredInvitados = invitados.filter(
    invitado => invitado.nombre.toLowerCase().includes(searchTerm)
  );

  const ul = document.createElement('ul');
  ul.className = 'list-group';

  filteredInvitados.forEach(invitado => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = invitado.nombre;
    li.addEventListener('click', () => {
      searchInput.value = invitado.nombre;
      suggestionsContainer.innerHTML = '';
      displayInvitadoDetails(invitado);
    });
    ul.appendChild(li);
  });

  suggestionsContainer.appendChild(ul);
}



    // Función para mostrar los detalles del invitado
    function displayInvitadoDetails(invitado) {
      const invitadoDiv = document.createElement('div');
      invitadoDiv.className = 'card text-bg-dark mb-3" style="max-width: 18rem;';
      invitadoDiv.innerHTML = `
        <div class="card-header">Invitacion</div>
        <div class="card-body">
          <h5 class="card-title">${invitado.nombre}</h5>
          <p class="card-text">Acompañantes: ${invitado.acompañantes}</p>
          <a class="btn btn-primary mb-3" href="home.html?invitado=${encodeURIComponent(invitado.nombre)}">Ver invitacion</a>
        </div>
      
        `;
      invitadosContainer.appendChild(invitadoDiv);
    }

    // Manejar la entrada del usuario en tiempo real
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm.length >= 2) {
        showSuggestions(searchTerm);
      } else {
        suggestionsContainer.innerHTML = '';
      }
    });

    // ... Resto del código ...
  })
  .catch(error => console.error('Error al cargar los datos:', error));
