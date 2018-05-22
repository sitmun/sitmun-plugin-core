package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.CartographyGroup;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cartography-groups", path = "cartography-groups")
public interface CartographyGroupRepository extends PagingAndSortingRepository<CartographyGroup, Long> {


}