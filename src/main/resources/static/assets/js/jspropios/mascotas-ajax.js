var mapaRazas = {};

function listar() {
    $.ajax({
        url: '/api/razas',
        type: 'GET',
        success: function(razas) {
            mapaRazas = {};
            var sel = document.getElementById('raz');
            sel.innerHTML = '<option value="">Seleccione una raza...</option>';
            razas.forEach(function(r) {
                mapaRazas[r.id] = r.nombre;
                sel.innerHTML += '<option value="' + r.id + '">' + r.nombre + '</option>';
            });

            $.ajax({
                url: '/api/mascotas',
                type: 'GET',
                success: function(mascotas) {
                    var tbody = document.getElementById('cuerpoTabla');
                    tbody.innerHTML = '';
                    if (!mascotas || mascotas.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-3">No hay mascotas registradas</td></tr>';
                        return;
                    }
                    mascotas.forEach(function(m) { agregarFila(m); });
                },
                error: function(xhr) {
                    document.getElementById('cuerpoTabla').innerHTML =
                        '<tr><td colspan="6" class="text-danger text-center">Error ' + xhr.status + ' al cargar mascotas</td></tr>';
                }
            });
        },
        error: function(xhr) {
            console.error('Error al cargar razas:', xhr.status, xhr.responseText);
        }
    });
}

function agregarFila(m) {
    var tbody = document.getElementById('cuerpoTabla');
    var nombreRaza = mapaRazas[m.raza] || 'Sin Raza';
    var tr = document.createElement('tr');
    tr.id = 'fila_' + m.id;
    tr.innerHTML =
        '<td>' + m.id + '</td>' +
        '<td>' + m.nombre + '</td>' +
        '<td>' + nombreRaza + '</td>' +
        '<td>' + m.edad + '</td>' +
        '<td>' + (m.observaciones || '') + '</td>' +
        '<td class="text-end">' +
        '<button class="btn btn-primary btn-sm me-1" onclick="editarMascota(' + m.id + ')">Editar</button>' +
        '<button class="btn btn-danger btn-sm" onclick="eliminarMascota(' + m.id + ')">Eliminar</button>' +
        '</td>';
    tbody.appendChild(tr);
}

function guardarMascota() {
    var id      = $('#mascotaId').val();
    var nombre  = $('#nom').val().trim();
    var razaSel = document.getElementById('raz');
    var idRaza  = parseInt(razaSel.value);
    var txtRaza = razaSel.options[razaSel.selectedIndex].text;

    if (!nombre || isNaN(idRaza) || idRaza === 0) {
        alert('Por favor escribe un nombre y selecciona una raza.');
        return;
    }

    var payload = {
        nombre:        nombre,
        raza:          idRaza,
        edad:          parseInt($('#eda').val()) || 0,
        observaciones: $('#obs').val()
    };

    var url    = id ? '/api/mascotas/' + id : '/api/mascotas';
    var metodo = id ? 'PATCH' : 'POST';

    $.ajax({
        url:         url,
        type:        metodo,
        contentType: 'application/json',
        data:        JSON.stringify(payload),
        success: function(m) {
            if (id) {
                var tr = document.getElementById('fila_' + m.id);
                if (tr) {
                    tr.cells[1].textContent = m.nombre;
                    tr.cells[2].textContent = txtRaza;
                    tr.cells[3].textContent = m.edad;
                    tr.cells[4].textContent = m.observaciones || '';
                }
                alert('Mascota actualizada correctamente');
            } else {
                var sinDatos = document.querySelector('#cuerpoTabla td[colspan]');
                if (sinDatos) sinDatos.parentElement.remove();
                agregarFila(m);
                alert('Mascota registrada correctamente');
            }
            bootstrap.Modal.getInstance(document.getElementById('mascotaModal')).hide();
            limpiar();
        },
        error: function(xhr) {
            console.error('Error guardar:', xhr.status, xhr.responseText);
            alert('Error ' + xhr.status + ' al guardar. Revisa la consola (F12).');
        }
    });
}

function editarMascota(id) {
    $.ajax({
        url: '/api/mascotas/' + id,
        type: 'GET',
        success: function(m) {
            $('#modalTitulo').text('Editar Mascota');
            $('#mascotaId').val(m.id);
            $('#nom').val(m.nombre);
            $('#raz').val(m.raza);
            $('#eda').val(m.edad);
            $('#obs').val(m.observaciones);
            new bootstrap.Modal(document.getElementById('mascotaModal')).show();
        },
        error: function(xhr) {
            alert('Error ' + xhr.status + ' al obtener la mascota.');
        }
    });
}

function eliminarMascota(id) {
    if (!confirm('¿Eliminar esta mascota?')) return;
    $.ajax({
        url:  '/api/mascotas/' + id,
        type: 'DELETE',
        success: function() {
            var fila = document.getElementById('fila_' + id);
            if (fila) fila.remove();
            alert('Mascota eliminada correctamente');
        },
        error: function(xhr) {
            alert('Error ' + xhr.status + ' al eliminar.');
        }
    });
}

function limpiar() {
    $('#mascotaId').val('');
    $('#nom').val('');
    $('#raz').val('');
    $('#eda').val(0);
    $('#obs').val('');
}

function abrirModalCrear() {
    limpiar();
    $('#modalTitulo').text('Nueva Mascota');
    new bootstrap.Modal(document.getElementById('mascotaModal')).show();
}