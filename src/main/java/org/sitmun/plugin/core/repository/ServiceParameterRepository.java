package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ServiceParameter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "service-parameters", path = "service-parameters")
public interface ServiceParameterRepository extends PagingAndSortingRepository<ServiceParameter, Long> {


}