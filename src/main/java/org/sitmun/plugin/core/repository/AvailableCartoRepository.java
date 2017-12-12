package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.AvailableCarto;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "available-cartos", path = "available-cartos")
public interface AvailableCartoRepository extends PagingAndSortingRepository<AvailableCarto, Long> {

    
}