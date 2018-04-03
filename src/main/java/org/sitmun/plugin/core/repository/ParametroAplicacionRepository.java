package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ParametroAplicacion;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "parametros-aplicaciones", path = "parametros-aplicaciones")
public interface ParametroAplicacionRepository extends PagingAndSortingRepository<ParametroAplicacion, Long> {
  

}