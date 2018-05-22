package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.TaskType;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "task-types", path = "task-types")
public interface TaskTypeRepository extends PagingAndSortingRepository<TaskType, Long> {
  

}