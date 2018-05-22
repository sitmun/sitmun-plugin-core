package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Cartography;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cartographies", path = "cartographies")
public interface CartographyRepository extends PagingAndSortingRepository<Cartography, Long> {


}