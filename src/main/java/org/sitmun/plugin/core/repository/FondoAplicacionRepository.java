package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.FondoAplicacion;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "fondos-aplicaciones", path = "fondos-aplicaciones")
public interface FondoAplicacionRepository extends PagingAndSortingRepository<FondoAplicacion, Long> {

    

}