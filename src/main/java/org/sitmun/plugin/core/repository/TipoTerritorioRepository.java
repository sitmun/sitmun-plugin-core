package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.TipoTerritorio;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tipos-territorios", path = "tipos-territorios")
public interface TipoTerritorioRepository extends PagingAndSortingRepository<TipoTerritorio, Long> {
  

}