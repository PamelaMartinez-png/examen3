// POST / PUT: Registrar o Actualizar Mascota
function guardarMascota() {
    let id = $('#mascotaId').val();
    let nombre = $('#nom').val();

    if (nombre === "") {
        alert("Escriba un nombre");
        return;
    }

    let payload = {
        nombre: nombre,
        raza: $('#raz').val(),
        edad: parseInt($('#eda').val()),
        observaciones: $('#obs').val()
    };

    // Si tiene ID actualiza (PUT), de lo contrario crea (POST)
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

            // REFRESCADO TRADICIONAL: Igual al location.reload() de tu ejemplo de productos
            location.reload();
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
            $('#raz').val(m.raza);
            $('#eda').val(m.edad);
            $('#obs').val(m.observaciones);

            $('#mascotaModal').modal('show');
        }
    });
}

// DELETE: Eliminar con confirmación y recarga tradicional
function eliminarMascota(id) {
    let confirmacion = confirm("¿Estas seguro de que desea eliminar esta mascota?");
    if (confirmacion) {
        $.ajax({
            url: `/api/mascotas/${id}`,
            type: 'DELETE',
            success: function () {
                alert("Mascota eliminada :c");

                // Recargamos la pantalla completa para actualizar la lista
                location.reload();
            }
        });
    }
}

// Funciones básicas para limpiar y abrir el modal
function abrirModalCrear() {
    limpiarFormulario();
    $('#modalTitulo').text('Nueva Mascota');
    $('#mascotaModal').modal('show');
}

function limpiarFormulario() {
    $('#mascotaId').val('');
    $('#nom').val('');
    $('#raz').val('');
    $('#eda').val('0');
    $('#obs').val('');
}