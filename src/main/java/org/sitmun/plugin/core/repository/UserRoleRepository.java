package org.sitmun.plugin.core.repository;

import java.util.List;

import org.sitmun.plugin.core.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface UserRoleRepository extends PagingAndSortingRepository<User, Long> {

    List<User> findByLastName(@Param("name") String name);

}