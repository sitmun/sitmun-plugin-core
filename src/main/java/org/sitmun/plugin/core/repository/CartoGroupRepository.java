package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.CartoGroup;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "carto-groups", path = "carto-groups")
public interface CartoGroupRepository extends PagingAndSortingRepository<CartoGroup, Long> {


}