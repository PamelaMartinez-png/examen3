package com.upiiz.examen3.Controller;

import com.upiiz.examen3.Services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MascotaViewController {

    @Autowired
    private MascotaService mascotaService;

    @GetMapping("/mascotas")
    public String verPaginaMascotas(Model model) {
        // Almacenamos la lista en el modelo para pasársela a Thymeleaf
        model.addAttribute("mascotas", mascotaService.obtenerTodasMascotas());
        return "mascotas"; // Devuelve tu plantilla mascotas.html
    }
    @GetMapping("/razas")
    public String verPaginaRazas() {
        return "razas"; // Devuelve la plantilla razas.html (dentro de templates)
    }
}