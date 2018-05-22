package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.TerritoryType;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "territory-types", path = "territory-types")
public interface TerritoryTypeRepository extends PagingAndSortingRepository<TerritoryType, Long> {
  

}