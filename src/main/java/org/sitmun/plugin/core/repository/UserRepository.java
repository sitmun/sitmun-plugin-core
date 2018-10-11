package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends CrudRepository<User, Long> {

	@RestResource(exported = false)
	Optional<User> findOneByUsername(String username);

	@SuppressWarnings("unchecked")
	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasPermission(#entity, 'administration') or hasPermission(#entity, 'write')")
	User save(@P("entity") User entity);
	
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entity,  'delete')")
	void delete(@P("entity") User entity);
	
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entityId, 'org.sitmun.plugin.core.domain.User', 'delete')")
	void delete(@P("entityId") Long entityId);

	@Override
	@PostFilter("hasPermission(#entity, 'administration') or hasPermission(filterObject, 'read')")
	Iterable<User> findAll();
	
	@Override
	@PostAuthorize("hasPermission(#entity, 'administration') or hasPermission(returnObject, 'read')")
	User findOne(Long id);

	@RestResource(exported = false)
	@EntityGraph(attributePaths = "permissions")
	Optional<User> findOneWithPermissionsByUsername(String name);

}