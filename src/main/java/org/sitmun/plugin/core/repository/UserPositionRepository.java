package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.UserPosition;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user-positions", path = "user-positions")
public interface UserPositionRepository extends PagingAndSortingRepository<UserPosition, Long> {


}