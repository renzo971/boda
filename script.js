const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const invitadosContainer = document.getElementById('invitados');

// Cargar el archivo JSON de invitados
fetch('https://apiboda-1-production.up.railway.app/api/guests')
  .then(response => response.json())
  .then(data => {
    
    const invitados = data;
    console.log(data);

    // Calcular la suma de acompañantes
    const totalAcompanantes = invitados.reduce((a, b) => a + parseInt(b.acompañantes), 0);

    // Mostrar el resultado en la consola
    console.log(`El total de acompañantes es: ${totalAcompanantes}`);
    console.log(`El total de Invitados es ${invitados.length}`);
    console.log(`El total Completo de Invitados es ${invitados.length + totalAcompanantes}`);

    // Función para mostrar sugerencias en tiempo real
    function showSuggestions(searchTerm) {
      suggestionsContainer.innerHTML = '';

      // Si el campo está vacío, mostrar todos los invitados
      if (searchTerm === '') {
        suggestionsContainer.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        ul.style.overflow = 'auto';

        invitados.forEach(invitado => {
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
      } else {
        // Filtrar los invitados por el término de búsqueda
        const filteredInvitados = invitados.filter(
          invitado => invitado.nombre.toLowerCase().includes(searchTerm)
        );

        // Mostrar las sugerencias
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        ul.style.overflow = 'auto';

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
            Pase para: ${parseInt(invitado.acompañantes) +1} personas<br> 
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
      showSuggestions(searchTerm);
    });

    // ... Resto del código ...
  })
  .catch(error => console.error('Error al cargar los datos:', error));
  
// Obtén una referencia al formulario
const form = document.querySelector('#confir'); // Reemplaza 'tuFormulario' con el ID de tu formulario

// Agrega un manejador de eventos para el evento de envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío predeterminado del formulario

// Añade comentarios para explicar el propósito de tu código.
// Este código envía una solicitud POST a la API de confirmaciones

// Usa variables para evitar repetirte.
const url = 'http://localhost/apiboda-1/public/api/confirmations';

// Valida los datos que estás recibiendo antes de enviarlos a la API.
// Comprueba que todos los campos son obligatorios.
const name = form.querySelector("input[name='name']").value;
if (!name) {
  // Muestra un mensaje de error.
  alert('El campo nombre es obligatorio.');
  return;
}

const email = form.querySelector("input[name='email']").value;
if (!email) {
  // Muestra un mensaje de error.
  alert('El campo email es obligatorio.');
  return;
}

const events = form.querySelectorAll("input[name='events[]']:checked").map(input => input.value);
if (!events.length) {
  // Muestra un mensaje de error.
  alert('Debes seleccionar al menos un evento.');
  return;
}

const message = form.querySelector("textarea[name='message']").value;

// Envía los datos a la API.
fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json', // Indicar que se espera una respuesta en JSON
    'Content-Type': 'application/json' // Indicar que estás enviando datos en formato JSON
  },
  body: JSON.stringify({
    name: name,
    email: email,
    events: events,
    message: message
  })
})
.then(response => response.json())
.then(result => {
  // Procesar la respuesta en formato JSON
  console.log('Respuesta:', result);

  // Ejemplo de cómo acceder a las propiedades de la respuesta
  const id = result.id;
  const name = result.name;
  const email = result.email;
  const events = result.events;
  const message = result.message;

  // Hacer algo con los datos recibidos, como mostrarlos en la página
})
.catch(error => {
  // Maneja los errores de manera adecuada.
  console.error('Error:', error);
});

});


  