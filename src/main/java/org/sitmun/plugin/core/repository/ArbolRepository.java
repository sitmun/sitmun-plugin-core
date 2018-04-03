package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Arbol;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "arboles", path = "arboles")
public interface ArbolRepository extends PagingAndSortingRepository<Arbol, Long> {


}