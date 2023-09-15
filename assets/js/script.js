const irNotas = document.getElementById('irNotas');
const irNuevo = document.getElementById('irNuevo');
const nuevaNota = document.getElementById('nuevaNota');
const listaNotas = document.getElementById('listaNotas');
const enviar = document.getElementById('enviar');

function inicializando(){
  nuevaNota.style.display = 'none';
  listaNotas.style.display = 'block';
}

inicializando();

irNotas.addEventListener('click', () => {
    nuevaNota.style.display = 'none';
    listaNotas.style.display = 'block';
})

irNuevo.addEventListener('click', () => {
    nuevaNota.style.display = 'block';
    listaNotas.style.display = 'none';
})

console.log("hola");


const SHEET_ID = "1oKUoMp7Uy0cc_-Vthpea29-fLpWRNZnW78hCWjIZPKA";

const ACCESS_TOKEN =
"ya29.a0AfB_byBOmA1-bq_Jfxgita5_U6LxfhMAYRMUASppjqD9_esToPkGbHnwyhR7CZPuD0QhUo8ZL8kX3HDWuqrH4ScHMWWygOu5vk9RVd_70xxc4QpsUDc_TvQHEc8F-CvoAXj9t8WbBTEiHsTa7l2xtnUPc_rP4XipTJo3aCgYKASsSARISFQGOcNnCKAthzGzMAI1eQmQDDC4NgQ0171";

fetch(
  // Obtenemos los datos de la planilla, de la hoja hojaMenu, columnas A y B desde la segunda fila
  `https://sheets.googleapis.com/v4/spreadsheets/1oKUoMp7Uy0cc_-Vthpea29-fLpWRNZnW78hCWjIZPKA/values/notasApp!A2:B`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }
//esperamos el response
)



.then(function (response) {
    //esperamos el json del response para poder utilizarlo
    response.json().then(function (data) {
    const values = data.values;

    // Obtenemos el elemento del dom
    const lista = document.getElementById("lista-menu");

    for (var i = 0; i < values.length; i++) {

        const notasItems = document.getElementById("notasItems");
        const notaDIV = document.createElement('div');
        notaDIV.className = 'col-md-4';

        notaDIV.innerHTML = "<div class='card mb-3' id='cardNota'><div class='card-body'><h5 class='card-title'>"+values[i][0]+"</h5><p class='card-text'>"+values[i][1]+"</p></div></div>";

        // Agregamos a la lista
        notasItems.appendChild(notaDIV);
    }
    });
});




// Función para enviar datos a Google Sheets
function enviarDatosAGoogleSheets(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtén los valores de los campos de entrada
  const titulo = document.getElementById('title').value;
  const comentario = document.getElementById('floatingTextarea').value;

  // Llama a la función que envía los datos a Google Sheets
  alta(titulo, comentario);
  
  // Borra los valores de los campos de entrada
  document.getElementById('title').value = '';
  document.getElementById('floatingTextarea').value = '';

  nuevaNota.style.display = 'none';
  listaNotas.style.display = 'block';
}

// Agrega un controlador de eventos para el formulario
document.getElementById('formulario-nota').addEventListener('submit', enviarDatosAGoogleSheets);
// Función para enviar los datos a Google Sheets
function alta(dato1, dato2) {
  const dataToAdd = {
    values: [
      [dato1, dato2],
    ],
  };

  fetch('https://sheets.googleapis.com/v4/spreadsheets/1oKUoMp7Uy0cc_-Vthpea29-fLpWRNZnW78hCWjIZPKA/values/notasApp:append?valueInputOption=RAW', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToAdd),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Datos agregados con éxito:', data);
    })
    .catch(error => {
      console.error('Error al agregar datos:', error);
    });
}
