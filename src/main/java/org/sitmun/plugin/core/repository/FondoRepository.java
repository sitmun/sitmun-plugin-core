package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Fondo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "fondos", path = "fondos")
public interface FondoRepository extends PagingAndSortingRepository<Fondo, Long> {

    

}