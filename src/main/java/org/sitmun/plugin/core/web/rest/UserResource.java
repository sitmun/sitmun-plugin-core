package org.sitmun.plugin.core.web.rest;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.service.UserService;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.sitmun.plugin.core.web.rest.dto.PasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

import javax.validation.Valid;

@RepositoryRestController
public class UserResource {

  private UserService userService;

  @Autowired
  private RepositoryEntityLinks links;

  @Autowired
  private PagedResourcesAssembler<User> assembler;

  public UserResource(UserService userService) {
    super();
    this.userService = userService;
  }

  /**
   * TODO: Replace User (persistent entity) with a simple POJO or DTO object (squid:S4684)
   *
   * @param user      a user
   * @param assembler the resource assembler
   * @return a response
   */
  @PostMapping("/users")
  @SuppressWarnings("squid:S4684")
  // @Secured(AuthoritiesConstants.ADMIN)
  public ResponseEntity<?> createUser(@Valid @RequestBody User user,
                                      PersistentEntityResourceAssembler assembler) {
    User result = userService.createUser(user);
    URI location = ServletUriComponentsBuilder
            .fromCurrentRequest().path("/{id}")
            .buildAndExpand(result.getId()).toUri();

    return ResponseEntity.created(location).build();

  }

  @PutMapping("/users/{id}")
  public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
    Optional<User> optUser = userService.findUser(id);
    if (optUser.isPresent()) {
      userDTO.setId(optUser.get().getId());
      Optional<UserDTO> updatedUser = userService.updateUser(userDTO);
      if (updatedUser.isPresent()) {
        return ResponseEntity.noContent().build();
      } else {
        return ResponseEntity.notFound().build();
      }
    } else {
      return ResponseEntity.notFound().build();
    }

  }

  @GetMapping("/users/{id}")
  public ResponseEntity<?> getUser(@PathVariable Long id) {
    Optional<User> optUser = userService.findUser(id);
    if (optUser.isPresent()) {
      return ResponseEntity.ok(toResource(optUser.get()));
    } else {
      return ResponseEntity.notFound().build();
    }
  }
	/*
	
	@GetMapping("/users")
    public ResponseEntity<?> getPagedUsers(Pageable pageable) {
        Page<User> users = userService.findAllUsers(pageable);
    
        Link pageSelfLink = links.linkToPagedResource(User.class,pageable).withSelfRel();
                
        PagedResources<?> resources = assembler.toResource(users , this::toResource, pageSelfLink);
        //Link pageSearchLink = links.linkToSearchResource(User.class,"search",pageable);
        //resources.add(pageSearchLink);

        return ResponseEntity.ok(resources);

    }
    
	*/

  private ResourceSupport toResource(User user) {
    UserDTO dto = new UserDTO(user);
    Link selfLink = links.linkForSingleResource(user).withSelfRel();

    return new Resource<>(dto, selfLink);
  }

  @PostMapping(path = "/users/{id}/change-password")
  public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody PasswordDTO password,
                                          PersistentEntityResourceAssembler assembler) {
    Optional<User> optUser = userService.findUser(id);
    if (optUser.isPresent()) {
      userService.changeUserPassword(id, password.getPassword());

      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.notFound().build();
    }

  }

}
