package org.sitmun.plugin.core.repository;

import java.util.Optional;

import org.sitmun.plugin.core.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
	Optional<User> findOneByUsername(String username);

}