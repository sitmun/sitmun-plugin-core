package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.TaskAvailability;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "task-availabilities", path = "task-availabilities")
public interface TaskAvailabilityRepository extends PagingAndSortingRepository<TaskAvailability, Long> {

    
}