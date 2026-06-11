package com.upiiz.examen3.Services;
import com.upiiz.examen3.Entities.RazaEntity;
import com.upiiz.examen3.Repositories.RazaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RazaServiceImpl implements RazaService {

    @Autowired
    private RazaRepository razaRepository;

    @Override
    public List<RazaEntity> listadoRazas() {
        return razaRepository.findAll();
    }

    @Override
    public Optional<RazaEntity> razaPorId(Long id) {
        return razaRepository.findById(id);
    }

    @Override
    public RazaEntity agregarRaza(RazaEntity raza) {
        return razaRepository.save(raza);
    }

    @Override
    public RazaEntity actualizarRaza(Long id, RazaEntity raza) {
        raza.setId(id);
        return razaRepository.save(raza);
    }

    @Override
    public void eliminarRaza(Long id) {
        razaRepository.deleteById(id);
    }
}