package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.App;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "apps", path = "apps")
public interface AppRepository extends PagingAndSortingRepository<App, Long> {



}