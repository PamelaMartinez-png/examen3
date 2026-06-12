function guardarRaza() {
    let nombre = $('#nombreRaza').val().trim();

    if (nombre === "") {
        alert("Por favor, ingrese el nombre de la raza");
        return;
    }

    $.ajax({
        url: '/api/razas',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ nombre: nombre }),
        success: function (raza) {
            alert('Raza registrada correctamente');
            // Agregar la fila directo a la tabla sin recargar página
            $('table tbody').append(`
                <tr id="renglon_raza_${raza.id}">
                    <td>${raza.id}</td>
                    <td>${raza.nombre}</td>
                    <td class="text-end">
                        <button class="btn btn-light btn-sm border" onclick="eliminarRaza(${raza.id})">
                            <i class="bi bi-trash text-danger"></i>
                        </button>
                    </td>
                </tr>
            `);
            $('#nombreRaza').val('');
        },
        error: function(xhr) {
            alert('Error al registrar la raza: ' + xhr.status);
        }
    });
}

function eliminarRaza(id) {
    if (confirm("¿Está seguro de eliminar esta raza?")) {
        $.ajax({
            url: '/api/razas/' + id,
            type: 'DELETE',
            success: function () {
                alert('Raza eliminada con éxito');
                $('#renglon_raza_' + id).remove();
            },
            error: function(xhr) {
                alert('Error al eliminar: ' + xhr.status);
            }
        });
    }
}