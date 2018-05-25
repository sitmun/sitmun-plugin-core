package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.Task;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {


}