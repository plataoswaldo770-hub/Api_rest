let editando = false;
let filaEditando = null;
let imagenBase64 = ""; 

// 🏷️ Diccionario de marcas según el tipo de dispositivo
const marcasPorTipo = {
    "Laptop": ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer"],
    "PC": ["Dell", "HP", "Lenovo", "Apple", "Armada", "Otra"],
    "Impresora": ["Epson", "HP", "Canon", "Brother", "Xerox"],
    "Monitor": ["Samsung", "LG", "Dell", "BenQ", "Acer"],
    "Celular": ["Apple", "Samsung", "Motorola", "Xiaomi", "Huawei"]
};

// 🏷️ Función para llenar el menú de marcas
function actualizarMarcas() {
    let tipo = document.getElementById('tipo').value;
    let marcaSelect = document.getElementById('marca');

    // Limpiamos las opciones anteriores
    marcaSelect.innerHTML = '<option value="">Marca</option>';

    // Si hay un tipo seleccionado, agregamos sus marcas
    if (tipo && marcasPorTipo[tipo]) {
        marcasPorTipo[tipo].forEach(marca => {
            let option = document.createElement("option");
            option.value = marca;
            option.innerText = marca;
            marcaSelect.appendChild(option);
        });
    }
}

document.getElementById('imagen').addEventListener('change', function(e) {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            imagenBase64 = event.target.result;
            let preview = document.getElementById('preview');
            preview.src = imagenBase64;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

function validarCampos() {
    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let marca = document.getElementById('marca').value;
    let estado = document.getElementById('estado').value;
    let area = document.getElementById('area').value;
    let descripcion = document.getElementById('descripcion').value; 

    if (!nombre || !tipo || !marca || !estado || !area || !descripcion) {
        alert("⚠️ Todos los campos son obligatorios");
        return false;
    }
    return true;
}

function create() {
    if (!validarCampos()) return;

    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let marca = document.getElementById('marca').value;
    let estado = document.getElementById('estado').value;
    let area = document.getElementById('area').value;
    let descripcion = document.getElementById('descripcion').value; 

    let tabla = document.getElementById('tabla');
    let fila = document.createElement("tr");

    let fotoHTML = imagenBase64 ? `<img src="${imagenBase64}" width="40" height="40" style="object-fit:cover; border-radius:5px;">` : 'Sin foto';

    fila.innerHTML = `
        <td>${Date.now()}</td>
        <td>${fotoHTML}</td>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${marca}</td> <td>${estado}</td>
        <td>${area}</td>
        <td>${descripcion}</td> 
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
    
    let imgTag = fila.children[1].querySelector('img');
    if (imgTag) {
        imagenBase64 = imgTag.src;
        document.getElementById('preview').src = imagenBase64;
        document.getElementById('preview').style.display = "block";
    } else {
        imagenBase64 = "";
        document.getElementById('preview').style.display = "none";
    }

    document.getElementById('nombre').value = fila.children[2].innerText;
    
    // 🏷️ Cargar el tipo y generar sus marcas correspondientes antes de asignar la marca
    let tipo = fila.children[3].innerText;
    document.getElementById('tipo').value = tipo;
    actualizarMarcas(); 

    document.getElementById('marca').value = fila.children[4].innerText;
    document.getElementById('estado').value = fila.children[5].innerText;
    document.getElementById('area').value = fila.children[6].innerText;
    document.getElementById('descripcion').value = fila.children[7].innerText;

    editando = true;
    filaEditando = fila;
}

function update() {
    if (!editando) {
        alert("⚠️ Selecciona un registro primero");
        return;
    }

    if (!validarCampos()) return;

    let fotoHTML = imagenBase64 ? `<img src="${imagenBase64}" width="40" height="40" style="object-fit:cover; border-radius:5px;">` : 'Sin foto';

    filaEditando.children[1].innerHTML = fotoHTML; 
    filaEditando.children[2].innerText = document.getElementById('nombre').value;
    filaEditando.children[3].innerText = document.getElementById('tipo').value;
    filaEditando.children[4].innerText = document.getElementById('marca').value; // 🏷️ Actualiza marca
    filaEditando.children[5].innerText = document.getElementById('estado').value;
    filaEditando.children[6].innerText = document.getElementById('area').value;
    filaEditando.children[7].innerText = document.getElementById('descripcion').value; 

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
    document.getElementById('marca').innerHTML = '<option value="">Marca</option>'; // 🏷️ Limpia opciones de marca
    document.getElementById('estado').value = "";
    document.getElementById('area').value = "";
    document.getElementById('descripcion').value = ""; 
    
    document.getElementById('imagen').value = "";
    document.getElementById('preview').style.display = "none";
    document.getElementById('preview').src = "";
    imagenBase64 = "";
}

function filtrar() {
    let buscador = document.getElementById('buscador').value.toLowerCase();
    let filas = document.querySelectorAll('#tabla tr');

    filas.forEach(fila => {
        let texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(buscador) ? "" : "none";
    });
}
