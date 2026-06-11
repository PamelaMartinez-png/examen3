package com.upiiz.examen3.Services;

import com.upiiz.examen3.Entities.MascotaEntity;
import com.upiiz.examen3.Repositories.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MascotaServiceImpl implements MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Override
    public List<MascotaEntity> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    @Override
    public MascotaEntity obtenerMascotaPorId(Long id) {
        return mascotaRepository.findById(id).orElse(null);
    }

    @Override
    public MascotaEntity guardarMascota(MascotaEntity mascota) {
        return mascotaRepository.save(mascota);
    }

    @Override
    public MascotaEntity actualizarMascota(MascotaEntity mascota) {
        return mascotaRepository.save(mascota);
    }

    @Override
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}