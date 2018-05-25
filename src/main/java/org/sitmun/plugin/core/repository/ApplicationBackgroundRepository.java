package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ApplicationBackground;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "application-backgrounds", path = "application-backgrounds")
public interface ApplicationBackgroundRepository extends PagingAndSortingRepository<ApplicationBackground, Long> {

    

}