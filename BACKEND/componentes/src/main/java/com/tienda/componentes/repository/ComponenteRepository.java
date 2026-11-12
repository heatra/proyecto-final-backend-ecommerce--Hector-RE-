package com.tienda.componentes.repository;


import com.tienda.componentes.model.Componente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComponenteRepository extends JpaRepository<Componente, Long> {
    // Ya incluye buscar por ID, guardar, eliminar y listar todo de forma nativa.
}