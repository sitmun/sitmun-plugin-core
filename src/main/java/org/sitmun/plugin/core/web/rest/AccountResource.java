package org.sitmun.plugin.core.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import javax.validation.Valid;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.SecurityUtils;
import org.sitmun.plugin.core.service.UserService;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@RepositoryRestController
public class AccountResource {

	private UserService userService;

	private UserRepository userRepository;

	public AccountResource(UserService userService, UserRepository userRepository) {
		super();
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@PostMapping("/account")
	public ResponseEntity<?> saveAccount(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
        Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if (optLogin.isPresent()) {                
			Optional<User> user = userRepository.findOneByUsername(optLogin.get());
			if (user.isPresent()) {
				userService.updateUser(userDTO.getFirstName(), userDTO.getLastName());
				return ResponseEntity.ok().build();
			} else {
				return ResponseEntity.notFound().build();
			}
        } else {
        	return ResponseEntity.notFound().build();
        }

	}

	@GetMapping("/account")
	public ResponseEntity<PersistentEntityResource> getAccount(PersistentEntityResourceAssembler assembler) {
		Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if (optLogin.isPresent()) {
        	Optional<User> user = userRepository.findOneByUsername(optLogin.get());
			if (user.isPresent()) {
				return ResponseEntity.ok(
						assembler.toResource(new UserDTO(user.get())));
			} else {
				return ResponseEntity.notFound().build();
			}
			
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping(path = "/account/change-password")
	public ResponseEntity<?> changePassword(@RequestBody String password, PersistentEntityResourceAssembler assembler) {
		Optional<String> optLogin = SecurityUtils.getCurrentUserLogin();
        if (optLogin.isPresent()) {
        	Optional<User> user = userRepository.findOneByUsername(optLogin.get());
			if (user.isPresent()) {
				userService.changeUserPassword(user.get().getId(), password);
				return ResponseEntity.ok().build();
			} else {
				return ResponseEntity.notFound().build();
			}
			
		} else {
			return ResponseEntity.notFound().build();
		}

		

	}

}
