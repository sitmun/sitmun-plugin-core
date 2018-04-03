package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.DisponibilidadCartografia;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "disponibilidades-cartografias", path = "disponibilidades-cartografias")
public interface DisponibilidadCartografiaRepository extends PagingAndSortingRepository<DisponibilidadCartografia, Long> {

    
}