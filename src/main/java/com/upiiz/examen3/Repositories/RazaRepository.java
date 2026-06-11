package com.upiiz.examen3.Repositories;
import com.upiiz.examen3.Entities.RazaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RazaRepository extends JpaRepository<RazaEntity, Long> {
}