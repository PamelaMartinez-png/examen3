package com.upiiz.examen3.Controller;
import com.upiiz.examen3.Entities.RazaEntity;
import com.upiiz.examen3.Services.RazaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/razas")
public class RazaController {

    @Autowired
    private RazaService razaService;

    @GetMapping
    public ResponseEntity<List<RazaEntity>> listadoRazasAJAX() {
        return ResponseEntity.ok(razaService.listadoRazas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<RazaEntity>> razaByIdAJAX(@PathVariable Long id) {
        return ResponseEntity.ok(razaService.razaPorId(id));
    }

    @PostMapping
    public ResponseEntity<RazaEntity> crearRazaAJAX(@RequestBody RazaEntity raza) {
        return ResponseEntity.ok(razaService.agregarRaza(raza));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RazaEntity> actualizarRazaAJAX(@PathVariable Long id, @RequestBody RazaEntity raza) {
        return ResponseEntity.ok(razaService.actualizarRaza(id, raza));
    }

    @DeleteMapping("/{id}")
    public void eliminarRazaAJAX(@PathVariable Long id) {
        razaService.eliminarRaza(id);
    }
}