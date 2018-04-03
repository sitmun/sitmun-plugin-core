package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.ConfiguracionUsuario;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "configuraciones-usuarios", path = "configuraciones-usuarios")
public interface ConfiguracionUsuarioRepository extends PagingAndSortingRepository<ConfiguracionUsuario, Long> {

    

}