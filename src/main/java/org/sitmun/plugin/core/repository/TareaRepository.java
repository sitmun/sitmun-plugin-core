package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Tarea;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tareas", path = "tareas")
public interface TareaRepository extends PagingAndSortingRepository<Tarea, Long> {


}