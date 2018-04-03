package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ParametroTarea;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "parametros-tareas", path = "parametros-tareas")
public interface ParametroTareaRepository extends PagingAndSortingRepository<ParametroTarea, Long> {
  

}