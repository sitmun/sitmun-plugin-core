package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Aplicacion;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.swagger.annotations.Api;

//@Api(tags = "Aplicaciones")
@RepositoryRestResource(collectionResourceRel = "aplicaciones", path = "aplicaciones")
public interface AplicacionRepository extends PagingAndSortingRepository<Aplicacion, Long> {



}