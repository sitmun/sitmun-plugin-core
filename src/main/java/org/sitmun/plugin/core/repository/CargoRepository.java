package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Cargo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cargos", path = "cargos")
public interface CargoRepository extends PagingAndSortingRepository<Cargo, Long> {


}