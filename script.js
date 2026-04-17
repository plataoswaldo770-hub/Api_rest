let editando = false;
let filaEditando = null;

function validarCampos() {
    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let estado = document.getElementById('estado').value;
    let area = document.getElementById('area').value;

    if (!nombre || !tipo || !estado || !area) {
        alert("⚠️ Todos los campos son obligatorios");
        return false;
    }
    return true;
}

function create() {
    if (!validarCampos()) return;

    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let estado = document.getElementById('estado').value;
    let area = document.getElementById('area').value;

    let tabla = document.getElementById('tabla');
    let fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${Date.now()}</td>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${estado}</td>
        <td>${area}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>
            <button onclick="editar(this)">✏️</button>
            <button onclick="eliminar(this)">🗑️</button>
        </td>
    `;

    tabla.appendChild(fila);
    limpiarCampos();
}

function editar(btn) {
    let fila = btn.parentElement.parentElement;

    document.getElementById('id').value = fila.children[0].innerText;
    document.getElementById('nombre').value = fila.children[1].innerText;
    document.getElementById('tipo').value = fila.children[2].innerText;
    document.getElementById('estado').value = fila.children[3].innerText;
    document.getElementById('area').value = fila.children[4].innerText;

    editando = true;
    filaEditando = fila;
}

function update() {
    if (!editando) {
        alert("⚠️ Selecciona un registro primero");
        return;
    }

    if (!validarCampos()) return;

    filaEditando.children[1].innerText = document.getElementById('nombre').value;
    filaEditando.children[2].innerText = document.getElementById('tipo').value;
    filaEditando.children[3].innerText = document.getElementById('estado').value;
    filaEditando.children[4].innerText = document.getElementById('area').value;

    editando = false;
    filaEditando = null;
    limpiarCampos();
}

function eliminar(btn) {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
        btn.parentElement.parentElement.remove();
    }
}

function limpiarCampos() {
    document.getElementById('id').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('tipo').value = "";
    document.getElementById('estado').value = "";
    document.getElementById('area').value = "";
}

function filtrar() {
    let buscador = document.getElementById('buscador').value.toLowerCase();
    let filas = document.querySelectorAll('#tabla tr');

    filas.forEach(fila => {
        let texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(buscador) ? "" : "none";
    });
}
