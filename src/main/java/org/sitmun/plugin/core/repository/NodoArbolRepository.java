package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.NodoArbol;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "nodos-arboles", path = "nodos-arboles")
public interface NodoArbolRepository extends PagingAndSortingRepository<NodoArbol, Long> {


}