package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Carto;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cartos", path = "cartos")
public interface CartoRepository extends PagingAndSortingRepository<Carto, Long> {


}