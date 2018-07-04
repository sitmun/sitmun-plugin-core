package org.sitmun.plugin.core.web.rest;

import java.net.URISyntaxException;
import java.util.Optional;

import javax.validation.Valid;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.service.UserService;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RepositoryRestController
public class UserResource {

	private UserService userService;

	public UserResource(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		super();
		this.userService = userService;
		// this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@PostMapping("/users")
	// @Secured(AuthoritiesConstants.ADMIN)
	public ResponseEntity<PersistentEntityResource> createUser(@Valid @RequestBody User user,
			PersistentEntityResourceAssembler assembler) throws URISyntaxException {
		return ResponseEntity.status(201).body(assembler.toResource(userService.createUser(user)));

	}

	@PutMapping("/users")
	public ResponseEntity<PersistentEntityResource> updateUser(@Valid @RequestBody UserDTO userDTO,
			PersistentEntityResourceAssembler assembler) throws URISyntaxException {
		Optional<UserDTO> updatedUser = userService.updateUser(userDTO);
		if (updatedUser.isPresent()) {
			return ResponseEntity.ok(assembler.toResource(updatedUser.get()));
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/users/{id}")
	public ResponseEntity<PersistentEntityResource> getUser(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {
		Optional<User> optUser = userService.getUser(id);
		if (optUser.isPresent()) {
			return ResponseEntity.ok(assembler.toResource(new UserDTO(userService.getUser(id).get())));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping(path = "/users/{id}/change-password")
	public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody String password,
			PersistentEntityResourceAssembler assembler) {
		Optional<User> optUser = userService.getUser(id);
		if (optUser.isPresent()) {
			userService.changeUserPassword(id, password);

			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
