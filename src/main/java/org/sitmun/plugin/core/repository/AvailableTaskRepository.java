package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.AvailableTask;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "available-tasks", path = "available-tasks")
public interface AvailableTaskRepository extends PagingAndSortingRepository<AvailableTask, Long> {

    
}