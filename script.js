const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const invitadosContainer = document.getElementById('invitados');

// Cargar el archivo JSON de invitados
fetch('invitados.json')
  .then(response => response.json())
  .then(data => {
    const invitados = data.invitados;

    function sumarAcompanantes(invitados) {
      let totalAcompanantes = 0;
    
      for (const invitado of invitados) {
        totalAcompanantes += invitado.acompañantes;
      }
    
      return totalAcompanantes;
    }
    
    // Calcular la suma de acompañantes
    const totalAcompanantes = sumarAcompanantes(invitados);
    
    // Mostrar el resultado en la consola
    console.log(`El total de acompañantes es: ${totalAcompanantes}`);
    console.log(`El total de Invitados es ${invitados.length}`);
    console.log(`El total Completo de Invitados es ${invitados.length + totalAcompanantes}`);
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
    li.id = 'dif';
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
          <p class="card-text">
            Acompañantes: ${invitado.acompañantes} <br> 
            <span style="color: red;">Los niños menores de 9 años no necesitan pase de acompañante</span>
          </p>
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
