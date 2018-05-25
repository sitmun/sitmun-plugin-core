package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.Tree;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "trees", path = "trees")
public interface TreeRepository extends PagingAndSortingRepository<Tree, Long> {


}