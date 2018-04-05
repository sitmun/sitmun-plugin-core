package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "usuarios", path = "usuarios")
public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {

}