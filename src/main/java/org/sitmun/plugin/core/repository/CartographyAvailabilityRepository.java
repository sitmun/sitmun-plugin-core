package org.sitmun.plugin.core.repository;


import org.sitmun.plugin.core.domain.CartographyAvailability;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "cartography-availabilities", path = "cartography-availabilities")
public interface CartographyAvailabilityRepository extends PagingAndSortingRepository<CartographyAvailability, Long> {


}