package com.upiiz.examen3.Controller;
import com.upiiz.examen3.Entities.MascotaEntity;
import com.upiiz.examen3.Services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

//    @GetMapping("/mascotas")
//    public String mascotas(){
//        return "mascotas";
//    }
    @GetMapping
    public ResponseEntity<List<MascotaEntity>> getMascotas() {
        return ResponseEntity.ok(mascotaService.obtenerTodasMascotas());
    }

    @GetMapping("/{id}")
//    @ResponseBody
    public ResponseEntity<MascotaEntity> getMascotaById(@PathVariable Long id) {
        return ResponseEntity.ok(mascotaService.obtenerMascotaPorId(id));
    }

    @PostMapping
//    @ResponseBody
    public ResponseEntity<MascotaEntity> addMascota(@RequestBody MascotaEntity mascota) {
        return ResponseEntity.ok(mascotaService.guardarMascota(mascota));
    }

    @PatchMapping("/{id}")
//    @ResponseBody
    public ResponseEntity<MascotaEntity> updateMascota(@PathVariable Long id, @RequestBody MascotaEntity mascota) {
        mascota.setId(id);
        return ResponseEntity.ok(mascotaService.actualizarMascota(mascota));
    }

    @DeleteMapping("/{id}")
//    @ResponseBody
    public void deleteMascota(@PathVariable Long id) {
        mascotaService.eliminarMascota(id);
    }
}