package org.sitmun.plugin.core.repository;

import org.sitmun.plugin.core.domain.TaskParameter;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "task-parameters", path = "task-parameters")
public interface TaskParameterRepository extends PagingAndSortingRepository<TaskParameter, Long> {


}