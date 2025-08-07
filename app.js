const listaPartidos = document.querySelector("#lista-partidos");
let partidosGuardados = JSON.parse(localStorage.getItem("partidos")) || [];

function mostrarPartidos() {
  listaPartidos.innerHTML = "";
  partidosGuardados.forEach((partido, indice) => {
    const claseResultado = partido.golesLocal > partido.golesVisitante
      ? "partido-ganado"
      : partido.golesLocal < partido.golesVisitante
      ? "partido-perdido"
      : "";
    
    const elementoLista = document.createElement("li");
    elementoLista.className = `list-group-item d-flex justify-content-between ${claseResultado}`;
    elementoLista.innerHTML = `
      <div><strong>${partido.fecha}:</strong> ${partido.equipoLocal} ${partido.golesLocal} - ${partido.golesVisitante} ${partido.equipoVisitante}</div>
      <i class="fa-solid fa-trash text-danger" onclick="eliminarPartido(${indice})"></i>
    `;
    listaPartidos.appendChild(elementoLista);
  });
}

function agregarPartido() {
  const fecha = document.querySelector("#fecha").value;
  const equipoLocal = document.querySelector("#local").value;
  const golesLocal = parseInt(document.querySelector("#golesLocal").value);
  const equipoVisitante = document.querySelector("#visitante").value;
  const golesVisitante = parseInt(document.querySelector("#golesVisitante").value);

  if (!fecha || !equipoLocal || isNaN(golesLocal) || !equipoVisitante || isNaN(golesVisitante)) {
    return alert("Por favor completá todos los campos correctamente.");
  }

  const nuevoPartido = {
    fecha,
    equipoLocal,
    golesLocal,
    equipoVisitante,
    golesVisitante
  };

  partidosGuardados.push(nuevoPartido);
  localStorage.setItem("partidos", JSON.stringify(partidosGuardados));
  cambiarVista("vista-inicio");
  mostrarPartidos();
}

function eliminarPartido(indice) {
  partidosGuardados.splice(indice, 1);
  localStorage.setItem("partidos", JSON.stringify(partidosGuardados));
  mostrarPartidos();
}

function eliminarTodos() {
  if (confirm("¿Estás seguro de eliminar todos los partidos?")) {
    partidosGuardados = [];
    localStorage.removeItem("partidos");
    mostrarPartidos();
  }
}

function cambiarVista(idVista) {
  document.querySelectorAll(".vista").forEach(vista => vista.classList.add("d-none"));
  document.getElementById(idVista).classList.remove("d-none");
}

mostrarPartidos();