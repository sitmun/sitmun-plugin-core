package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Cartography;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "cartographies", path = "cartographies")
public interface CartographyRepository extends CrudRepository<Cartography, Long> {
	
	@SuppressWarnings("unchecked")
	@Override
	//@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entity, 'write')")
	Cartography save(@P("entity") Cartography entity);
	
	@Override
	@PreAuthorize("hasPermission(#entity, 'administration') or hasPermission(#entity,  'delete')")
	void delete(@P("entity") Cartography entity);
	
	@Override
	@PreAuthorize("hasPermission(#entityId, 'org.sitmun.plugin.core.domain.Cartography','administration') or hasPermission(#entityId, 'org.sitmun.plugin.core.domain.Cartography', 'delete')")
	void delete(@P("entityId") Long entityId);

	@Override
	@PostFilter("hasPermission(filterObject, 'administration') or hasPermission(filterObject, 'read')")
	Iterable<Cartography> findAll();
	
	@Override
	@PreAuthorize("hasPermission(#entityId, 'org.sitmun.plugin.core.domain.Cartography','administration') or hasPermission(#entityId, 'org.sitmun.plugin.core.domain.Cartography', 'read')")
	Cartography findOne(@P("entityId") Long entityId);

}