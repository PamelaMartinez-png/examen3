package com.upiiz.examen3.Services;

import com.upiiz.examen3.Entities.MascotaEntity;
import java.util.List;

public interface MascotaService {
    List<MascotaEntity> obtenerTodasMascotas();
    MascotaEntity obtenerMascotaPorId(Long id);
    MascotaEntity guardarMascota(MascotaEntity mascota);
    MascotaEntity actualizarMascota(MascotaEntity mascota);
    void eliminarMascota(Long id);
}