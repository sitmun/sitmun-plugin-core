package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.GrupoCartografia;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "grupos-cartografias", path = "grupos-cartografias")
public interface GrupoCartografiaRepository extends PagingAndSortingRepository<GrupoCartografia, Long> {


}