package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Connection;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "connections", path = "connections")
public interface ConnectionRepository extends PagingAndSortingRepository<Connection, Long> {

    

}