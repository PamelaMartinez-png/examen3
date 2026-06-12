function listarMascotasDinamicas() {
    $.ajax({
        url: '/api/razas',
        type: 'GET',
        success: function(razas) {
            let mapaRazas = {};
            razas.forEach(r => { mapaRazas[r.id] = r.nombre; });

            $.ajax({
                url: '/',
                type: 'GET',
                success: function (mascotas) {
                    let tabla = new DataTable('#exampleMascotas');
                    tabla.clear().draw();

                    mascotas.forEach(m => {
                        let botones = `<button type="button" class="btn btn-primary btn-sm" onclick="buscarMascotaPorId(${m.id})">Editar</button>`;
                        botones += ` <button type="button" class="btn btn-danger btn-sm" onclick="eliminarMascota(${m.id})">Eliminar</button>`;
                        let nombreRazaTexto = mapaRazas[m.raza] || "Sin Raza";
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

function guardarMascota() {
    let id = $('#mascotaId').val();
    let nombre = $('#nom').val();
    let razaSelect = document.getElementById('raz');
    let idRazaNumeric = parseInt(razaSelect.value);
    let textoRazaBonito = razaSelect.options[razaSelect.selectedIndex].text;

    if (nombre === "" || isNaN(idRazaNumeric)) {
        alert("Por favor, escriba un nombre y seleccione una raza válida.");
        return;
    }

    let payload = {
        nombre: nombre,
        raza: idRazaNumeric,
        edad: parseInt($('#eda').val() || 0),
        observaciones: $('#obs').val()
    };

    let urlDestino = id ? `/${id}` : '/';
    let metodoHttp = id ? 'PATCH' : 'POST'; // Tu backend usa @PatchMapping para actualizar

    $.ajax({
        url: urlDestino,
        type: metodoHttp,
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (m) {
            let tabla = new DataTable('#exampleMascotas');

            let botones = `<button type="button" class="btn btn-primary btn-sm" onclick="buscarMascotaPorId(${m.id})">Editar</button>`;
            botones += ` <button type="button" class="btn btn-danger btn-sm" onclick="eliminarMascota(${m.id})">Eliminar</button>`;

            if (id) {
                let datosFila = tabla.row("#renglon_" + m.id).data();
                datosFila[1] = m.nombre;
                datosFila[2] = textoRazaBonito;
                datosFila[3] = m.edad;
                datosFila[4] = m.observaciones;

                tabla.row("#renglon_" + m.id).data(datosFila).draw();
                alert("Mascota actualizada correctamente");
            } else {

                tabla.row
                    .add([m.id, m.nombre, textoRazaBonito, m.edad, m.observaciones, botones])
                    .draw()
                    .node().id = 'renglon_' + m.id;
                alert("Mascota registrada correctamente");
            }

            $('#mascotaModal').modal('hide');
            limpiarFormulario();
        },
        error: function(xhr) {
            console.error("Error al guardar mascota:", xhr.responseText);
            alert("Error en el servidor al intentar guardar.");
        }
    });
}

function buscarMascotaPorId(id) {
    $.ajax({
        url: `/${id}`,
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

function eliminarMascota(id) {
    if (confirm("¿Está seguro de que desea eliminar esta mascota?")) {
        $.ajax({
            url: `/${id}`,
            type: 'DELETE',
            success: function () {
                alert("Mascota eliminada correctamente");
                let tabla = new DataTable('#exampleMascotas');
                tabla.row('#renglon_' + id).remove().draw();
            }
        });
    }
}

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