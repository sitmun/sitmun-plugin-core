package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Servicio;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "servicios", path = "servicios")
public interface ConexionRepository extends PagingAndSortingRepository<Servicio, Long> {

    

}