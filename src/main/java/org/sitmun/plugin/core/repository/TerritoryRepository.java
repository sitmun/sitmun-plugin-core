package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Territory;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "territories", path = "territories")
public interface TerritoryRepository extends PagingAndSortingRepository<Territory, Long> {


}