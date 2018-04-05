package org.sitmun.plugin.core.repository;

import java.util.List;

import org.sitmun.plugin.core.domain.Servicio;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "servicios", path = "servicios")
public interface ServicioRepository extends PagingAndSortingRepository<Servicio, Long> {

    

}