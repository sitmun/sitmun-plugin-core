package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Task;
import org.sitmun.plugin.core.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends CrudRepository<Task, Long> {

	@SuppressWarnings("unchecked")
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entity, 'write')")
	Task save(@P("entity") Task entity);
	
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entity,  'delete')")
	void delete(@P("entity") Task entity);
	
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entityId, 'org.sitmun.plugin.core.domain.Task', 'delete')")
	void delete(@P("entityId") Long entityId);

	@Override
	@PostFilter("hasPermission(#entity, 'administration') or hasPermission(filterObject, 'read')")
	Iterable<Task> findAll();
	
	@Override
	@PostAuthorize("hasPermission(#entity, 'administration') or hasPermission(returnObject, 'read')")
	Task findOne(Long id);
}