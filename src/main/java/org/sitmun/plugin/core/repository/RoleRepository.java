package org.sitmun.plugin.core.repository;

import java.util.Optional;

import org.sitmun.plugin.core.domain.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {
	
	@RestResource(exported = false)
	Optional<Role> findOneByName(String name);

}