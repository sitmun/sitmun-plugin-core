package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.TipoTarea;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tipos-tareas", path = "tipos-tareas")
public interface TipoTareaRepository extends PagingAndSortingRepository<TipoTarea, Long> {
  

}