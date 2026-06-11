package com.upiiz.examen3.Services;
import com.upiiz.examen3.Entities.RazaEntity;
import java.util.List;
import java.util.Optional;

public interface RazaService {
    List<RazaEntity> listadoRazas();
    Optional<RazaEntity> razaPorId(Long id);
    RazaEntity agregarRaza(RazaEntity raza);
    RazaEntity actualizarRaza(Long id, RazaEntity raza);
    void eliminarRaza(Long id);
}