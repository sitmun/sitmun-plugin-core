package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.DisponibilidadTarea;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "disponibilidades-tareas", path = "disponibilidades-tareas")
public interface DisponibilidadTareaRepository extends PagingAndSortingRepository<DisponibilidadTarea, Long> {

    
}