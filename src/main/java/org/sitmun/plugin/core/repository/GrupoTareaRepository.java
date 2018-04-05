package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.GrupoTarea;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "grupos-tareas", path = "grupos-tareas")
public interface GrupoTareaRepository extends PagingAndSortingRepository<GrupoTarea, Long> {


}