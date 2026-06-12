package com.upiiz.examen3.Controller;

import com.upiiz.examen3.Services.MascotaService;
import com.upiiz.examen3.Services.RazaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MascotaViewController {

    @Autowired
    private MascotaService mascotaService;

    @Autowired
    private RazaService razaService;

    @GetMapping("/mascotas")
    public String verPaginaMascotas(Model model) {
        model.addAttribute("mascotas", mascotaService.obtenerTodasMascotas());
        return "mascotas";
    }

    @GetMapping("/razas")
    public String verPaginaRazas(Model model) {
        // Ahora sí pasa la lista al modelo para que Thymeleaf pueda pintarla
        model.addAttribute("razas", razaService.listadoRazas());
        return "Razas";
    }
}