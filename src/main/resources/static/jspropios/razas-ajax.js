// Guardar Raza (POST)
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
        success: function () {
            alert('Raza registrada correctamente');
            location.reload(); // Recarga simple para pintar el cambio
        }
    });
}

// Eliminar Raza (DELETE)
function eliminarRaza(id) {
    let confirmacion = confirm("¿Está seguro de eliminar esta raza?");
    if (confirmacion) {
        $.ajax({
            url: '/api/razas/' + id,
            type: 'DELETE',
            success: function () {
                alert('Raza eliminada con éxito');
                location.reload();
            }
        });
    }
}