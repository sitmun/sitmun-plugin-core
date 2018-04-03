package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ParametroServicio;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "parametros-servicios", path = "parametros-servicios")
public interface ParametroServicioRepository extends PagingAndSortingRepository<ParametroServicio, Long> {
  

}