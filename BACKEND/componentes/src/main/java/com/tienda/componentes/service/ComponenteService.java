package com.tienda.componentes.service;


import com.tienda.componentes.model.Componente;
import com.tienda.componentes.repository.ComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ComponenteService {

    @Autowired
    private ComponenteRepository repository;

    public List<Componente> listarTodos() { return repository.findAll(); }

    public Optional<Componente> buscarPorId(Long id) { return repository.findById(id); }

    public Componente guardar(Componente componente) { return repository.save(componente); }

    public void eliminar(Long id) { repository.deleteById(id); }
}