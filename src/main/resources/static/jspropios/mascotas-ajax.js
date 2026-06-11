// ======= CRUD DE MASCOTAS CON RELACIÓN DINÁMICA DE RAZAS =======

// Función para listar las mascotas cruzando datos con la API de Razas
function listarMascotasDinámicas() {
    // 1. Primero consultamos las razas para conocer sus nombres textuales
    $.ajax({
        url: '/api/razas',
        type: 'GET',
        success: function(razas) {
            // Creamos un mapa rápido en memoria { id: nombre }
            let mapaRazas = {};
            razas.forEach(r => { mapaRazas[c.id || r.id] = r.nombre; });

            // 2. Una vez que tenemos el mapa, cargamos las mascotas
            $.ajax({
                url: '/api/mascotas', // Ajusta si tu endpoint base de MascotaController tiene prefijo
                type: 'GET',
                success: function (mascotas) {
                    // Inicializamos tu DataTable (Asegúrate de tener el id='exampleMascotas' en tu table HTML)
                    let tabla = new DataTable('#exampleMascotas');
                    tabla.clear().draw(); // Limpieza para evitar duplicados

                    mascotas.forEach(m => {
                        let botones = `<button type="button" class="btn btn-primary btn-sm" onclick="buscarMascotaPorId(${m.id})">Editar</button>`;
                        botones += ` <button type="button" class="btn btn-danger btn-sm" onclick="eliminarMascota(${m.id})">Eliminar</button>`;

                        // Buscamos el nombre de la raza en el mapa. Si no existe, ponemos "Sin Raza"
                        let nombreRazaTexto = mapaRazas[m.raza] || "Sin Raza";

                        // Añadimos las celdas en el orden exacto de tus columnas HTML
                        tabla.row
                            .add([m.id, m.nombre, nombreRazaTexto, m.edad, m.observaciones, botones])
                            .draw()
                            .node().id = 'renglon_' + m.id;
                    });
                }
            });
        }
    });
}

// POST / PUT: Registrar o Actualizar Mascota
function guardarMascota() {
    let id = $('#mascotaId').val();
    let nombre = $('#nom').val();
    let razaSelect = $('#raz');
    let idRaza = parseInt(razaSelect.value || razaSelect.val()); // Convertimos a entero para la entidad Long

    if (nombre === "") {
        alert("Escriba un nombre");
        return;
    }

    let payload = {
        nombre: nombre,
        raza: idRaza, // Enviamos el ID numérico
        edad: parseInt($('#eda').val()),
        observaciones: $('#obs').val()
    };

    let urlDestino = id ? `/api/mascotas/${id}` : '/api/mascotas';
    let metodoHttp = id ? 'PUT' : 'POST';

    $.ajax({
        url: urlDestino,
        type: metodoHttp,
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function () {
            alert("¡Mascota procesada con éxito!");
            $('#mascotaModal').modal('hide');

            // En lugar de reiniciar toda la página, volvemos a renderizar el DataTables de forma limpia
            listarMascotasDinámicas();
            limpiarFormulario();
        },
        error: function(err) {
            console.error("Error al procesar la mascota:", err);
        }
    });
}

// GET: Obtener una mascota específica y rellenar los inputs del modal para editar
function buscarMascotaPorId(id) {
    $.ajax({
        url: `/api/mascotas/${id}`,
        type: 'GET',
        success: function (m) {
            $('#modalTitulo').text('Actualizar Mascota');
            $('#mascotaId').val(m.id);
            $('#nom').val(m.nombre);
            $('#raz').val(m.raza); // Asigna el ID numérico al selector de razas
            $('#eda').val(m.edad);
            $('#obs').val(m.observaciones);

            $('#mascotaModal').modal('show');
        }
    });
}

// DELETE: Eliminar con confirmación
function eliminarMascota(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
        $.ajax({
            url: `/api/mascotas/${id}`,
            type: 'DELETE',
            success: function () {
                alert("Mascota eliminada");
                let tabla = new DataTable('#exampleMascotas');
                tabla.row('#renglon_' + id).remove().draw();
            }
        });
    }
}

// Cargar dinámicamente el selector `<select id="raz">` del modal de mascotas
function cargarSelectRazas() {
    $.ajax({
        url: '/api/razas',
        type: 'GET',
        success: function (razas) {
            let selectRaza = document.getElementById('raz');
            if (selectRaza) {
                selectRaza.innerHTML = '<option value="">Seleccione una raza...</option>';
                razas.forEach(r => {
                    selectRaza.innerHTML += `<option value="${r.id}">${r.nombre}</option>`;
                });
            }
        }
    });
}

function limpiarFormulario() {
    $('#mascotaId').val('');
    $('#nom').val('');
    $('#raz').val('');
    $('#eda').val('');
    $('#obs').val('');
}

function abrirModalCrear() {
    limpiarFormulario();
    $('#modalTitulo').text('Nueva Mascota');
    $('#mascotaModal').modal('show');
}