package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.TreeNode;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tree-nodes", path = "tree-nodes")
public interface TreeNodeRepository extends PagingAndSortingRepository<TreeNode, Long> {


}