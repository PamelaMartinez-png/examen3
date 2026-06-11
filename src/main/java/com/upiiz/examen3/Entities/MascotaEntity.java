package com.upiiz.examen3.Entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
public class MascotaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Long raza; // <-- CAMBIADO: De String a Long para almacenar el ID de la raza dinámica
    private int edad;

    @Column(length = 500)
    private String observaciones;

    // Constructor Vacío
    public MascotaEntity() {
    }

    // Constructor con parámetros actualizado
    public MascotaEntity(Long id, String nombre, Long raza, int edad, String observaciones) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.observaciones = observaciones;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Long getRaza() { return raza; } // <-- Cambiado el Getter
    public void setRaza(Long raza) { this.raza = raza; } // <-- Cambiado el Setter

    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}