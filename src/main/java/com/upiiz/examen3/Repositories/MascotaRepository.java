package com.upiiz.examen3.Repositories;

import com.upiiz.examen3.Entities.MascotaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotaRepository extends JpaRepository<MascotaEntity, Long> {
}