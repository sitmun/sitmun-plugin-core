package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.UserConfiguration;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user-configurations", path = "user-configurations")
public interface UserConfigurationRepository extends PagingAndSortingRepository<UserConfiguration, Long> {

    

}