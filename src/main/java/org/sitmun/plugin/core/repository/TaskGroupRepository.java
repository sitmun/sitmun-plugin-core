package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.TaskGroup;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "task-groups", path = "task-groups")
public interface TaskGroupRepository extends PagingAndSortingRepository<TaskGroup, Long> {


}