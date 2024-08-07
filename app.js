// Obtener elementos del DOM
const formulario = document.getElementById('formulario');
const listaPacientes = document.getElementById('lista-pacientes');
const verDia = document.getElementById('ver-dia');
const verSemana = document.getElementById('ver-semana');

// Arreglo para almacenar pacientes
let pacientes = [];

// Función para registrar paciente
function registrarPaciente(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const fechaIngreso = document.getElementById('fecha_ingreso').value;
  const horaIngreso = document.getElementById('hora_ingreso').value;
  const diagnostico = document.getElementById('diagnostico').value;

  pacientes.push({
    nombre,
    apellido,
    fechaIngreso,
    horaIngreso,
    diagnostico
  });

  // Mostrar lista de pacientes
  mostrarPacientes();
}

// Función para mostrar lista de pacientes
function mostrarPacientes() {
  listaPacientes.innerHTML = '';
  pacientes.forEach((paciente) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${paciente.nombre} ${paciente.apellido}</td>
      <td>${paciente.fechaIngreso}</td>
      <td>${paciente.horaIngreso}</td>
      <td>${paciente.diagnostico}</td>
    `;
    listaPacientes.appendChild(fila);
  });
}

// Función para ver lista de pacientes por día
function verPacientesDia() {
  const fechaActual = new Date();
  const pacientesDia = pacientes.filter((paciente) => {
    const fechaIngreso = new Date(paciente.fechaIngreso);
    return fechaIngreso.getDate() === fechaActual.getDate() &&
           fechaIngreso.getMonth() === fechaActual.getMonth() &&
           fechaIngreso.getFullYear() === fechaActual.getFullYear();
  });

  listaPacientes.innerHTML = '';
  pacientesDia.forEach((paciente) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${paciente.nombre} ${paciente.apellido}</td>
      <td>${paciente.fechaIngreso}</td>
      <td>${paciente.horaIngreso}</td>
      <td>${paciente.diagnostico}</td>
    `;
    listaPacientes.appendChild(fila);
  });
}

// Función para ver lista de pacientes por semana
function verPacientesSemana() {
  const fechaActual = new Date();
  const pacientesSemana = pacientes.filter((paciente) => {
    const fechaIngreso = new Date(paciente.fechaIngreso);
    const diferenciaDias = (fechaActual.getTime() - fechaIngreso.getTime()) / (1000 * 3600 * 24);
    return diferenciaDias <= 7;
  });

  listaPacientes.innerHTML = '';
  pacientesSemana.forEach((paciente) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${paciente.nombre} ${paciente.apellido}</td>
      <td>${paciente.fechaIngreso}</td>
      <td>${paciente.horaIngreso}</td>
      <td>${paciente.diagnostico}</td>
    `;
    listaPacientes.appendChild(fila);
  });
}

// Agregar eventos a los botones
formulario.addEventListener('submit', registrarPaciente);
verDia.addEventListener('click', verPacientesDia);
verSemana.addEventListener('click', verPacientesSemana);

function crearGraficas(pacientes) {
    // Procesamos los datos para obtener las horas de llegada de los pacientes
    const horasLlegada = pacientes.map(paciente => paciente.hora_ingreso);
    const horasLlegadaCount = {};
    horasLlegada.forEach(hora => {
      if (!horasLlegadaCount[hora]) {
        horasLlegadaCount[hora] = 0;
      }
      horasLlegadaCount[hora]++;
    });
  
    // Creamos la gráfica de barras para las horas de llegada
    const ctx = document.getElementById('grafica-horas-llegada').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(horasLlegadaCount),
        datasets: [{
          label: 'Horas de llegada',
          data: Object.values(horasLlegadaCount),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Horas de llegada de los pacientes'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  
    // Procesamos los datos para obtener el porcentaje de pacientes por diagnóstico
    const diagnosticos = pacientes.map(paciente => paciente.diagnostico);
    const diagnosticosCount = {};
    diagnosticos.forEach(diagnostico => {
      if (!diagnosticosCount[diagnostico]) {
        diagnosticosCount[diagnostico] = 0;
      }
      diagnosticosCount[diagnostico]++;
    });
  
    // Creamos la gráfica de torta para el porcentaje de pacientes por diagnóstico
    const ctx2 = document.getElementById('grafica-diagnosticos').getContext('2d');
    const chart2 = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: Object.keys(diagnosticosCount),
        datasets: [{
          label: 'Porcentaje de pacientes por diagnóstico',
          data: Object.values(diagnosticosCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Porcentaje de pacientes por diagnóstico'
        }
      }
    });
  }

  function mostrarPacientes() {
    // ...
    crearGraficas(pacientes);
  }