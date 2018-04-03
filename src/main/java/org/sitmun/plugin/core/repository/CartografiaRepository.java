package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Cartografia;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cartografias", path = "cartografias")
public interface CartografiaRepository extends PagingAndSortingRepository<Cartografia, Long> {


}