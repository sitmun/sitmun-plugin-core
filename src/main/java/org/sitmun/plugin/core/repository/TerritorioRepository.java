package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Territorio;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "territorios", path = "territorios")
public interface TerritorioRepository extends PagingAndSortingRepository<Territorio, Long> {


}