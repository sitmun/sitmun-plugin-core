package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ApplicationParameter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "application-parameters", path = "application-parameters")
public interface ApplicationParameterRepository extends PagingAndSortingRepository<ApplicationParameter, Long> {


}