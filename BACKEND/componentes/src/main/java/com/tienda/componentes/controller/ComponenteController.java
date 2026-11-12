package com.tienda.componentes.controller;


import com.tienda.componentes.model.Componente;
import com.tienda.componentes.service.ComponenteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "*") // Permite que cualquier frontend consuma la API

public class ComponenteController {

    @Autowired
    private ComponenteService service;

    @GetMapping // LEER (Todos)
    public List<Componente> obtenerTodos() { return service.listarTodos(); }

    @GetMapping("/{id}") // LEER (Uno)
    public ResponseEntity<Componente> obtenerPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping // Añadimos @Valid para activar las validaciones
    public ResponseEntity<Componente> crear(@Valid @RequestBody Componente componente) {
        return ResponseEntity.ok(service.guardar(componente));
    }


    @PutMapping("/{id}") // ACTUALIZAR
    public ResponseEntity<Componente> actualizar(@PathVariable Long id, @Valid @RequestBody Componente detalles) {
        return service.buscarPorId(id).map(componente -> {
            componente.setNombre(detalles.getNombre());
            componente.setCategoria(detalles.getCategoria());
            componente.setPrecio(detalles.getPrecio());
            componente.setStock(detalles.getStock());
            componente.setDescripcion(detalles.getDescripcion());
            return ResponseEntity.ok(service.guardar(componente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}") // BORRAR
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}