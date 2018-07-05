package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Application;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@Api(tags = "Applications")
@RepositoryRestResource(collectionResourceRel = "applications", path = "applications")
public interface AplicacionRepository extends PagingAndSortingRepository<Application, Long> {


}