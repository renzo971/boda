const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const invitadosContainer = document.getElementById('invitados');

// Cargar el archivo JSON de invitados
fetch('https://apiboda-1-production.up.railway.app/api/guests')
  .then(response => response.json())
  .then(data => {
    
    const invitados = data;

    // Calcular la suma de acompañantes
    const totalAcompanantes = invitados.reduce((a, b) => a + b.acompañantes, 0);

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
      showSuggestions(searchTerm);
    });

    // ... Resto del código ...
  })
  .catch(error => console.error('Error al cargar los datos:', error));
  //enviar datos a api
  const form = document.querySelector("form");
  const url = "https://apimocha.com/boda/example";
  const data = {};
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Obtener los datos del formulario
    const name = form.querySelector("input[name='name']").value;
    const email = form.querySelector("input[name='email']").value;
    const events = form.querySelector("select[name='events']").value;
    const message = form.querySelector("textarea[name='message']").value;
  
    // Agregar los datos al objeto data
    data.name = name;
    data.email = email;
    data.events = events;
    data.message = message;
    console.log(JSON.stringify(data)); 
  
    // Enviar los datos a la API
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // La solicitud se realizó correctamente
          console.log("La solicitud se realizó correctamente");
        } else {
          // La solicitud no se realizó correctamente
          console.log("La solicitud no se realizó correctamente");
        }
      })
      .catch((error) => {
        // Ocurrió un error
        console.log(error);
      });
  });
  