package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Service;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "services", path = "services")
public interface ServiceRepository extends PagingAndSortingRepository<Service, Long> {


}