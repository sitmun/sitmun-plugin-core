package org.sitmun.plugin.core.service;

import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.domain.UserConfiguration;
import org.sitmun.plugin.core.domain.UserPosition;
import org.sitmun.plugin.core.repository.RoleRepository;
import org.sitmun.plugin.core.repository.UserConfigurationRepository;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.AuthoritiesConstants;
import org.sitmun.plugin.core.security.PermissionResolver;
import org.sitmun.plugin.core.security.SecurityConstants;
import org.sitmun.plugin.core.security.SecurityUtils;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService implements PermissionResolver<User> {

	private UserRepository applicationUserRepository;
	private UserConfigurationRepository userConfigurationRepository;
	private RoleRepository roleRepository;
	private PasswordEncoder bcryptPasswordEncoder;

	public UserService(UserRepository applicationUserRepository, PasswordEncoder bcryptPasswordEncoder,
			UserConfigurationRepository userConfigurationRepository, RoleRepository roleRepository) {
		super();
		this.applicationUserRepository = applicationUserRepository;
		this.bcryptPasswordEncoder = bcryptPasswordEncoder;
		this.userConfigurationRepository = userConfigurationRepository;
		this.roleRepository = roleRepository;
	}

	public User createUser(User user) {
		if (user.getPassword() != null) {
			user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
		}
		boolean newUser = (user.getId().longValue() == 0);
		user = applicationUserRepository.save(user);

		// fix for creation with "ORGANIZATION ADMIN" role
		if (newUser) {
			if (SecurityUtils.getCurrentUserLogin().isPresent()) {
				Optional<User> currentUser = this
						.getUserWithPermissionsByUsername(SecurityUtils.getCurrentUserLogin().get());
				if (currentUser.isPresent()) {
					Set<UserConfiguration> permissions = currentUser.get().getPermissions();
					boolean isAdminSitmun = permissions.stream()
							.anyMatch(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_SITMUN));
					boolean isAdminOrganization = permissions.stream().anyMatch(
							p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION));
					if (!isAdminSitmun && isAdminOrganization) {
						// get the first territory with ADMIN_ORGANIZACION role
						Territory territory = permissions.stream()
								.filter(p -> p.getRole().getName()
										.equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION))
								.findFirst().get().getTerritory();
						UserConfiguration userConfiguration = new UserConfiguration();
						userConfiguration.setTerritory(territory);
						userConfiguration.setUser(user);
						userConfiguration.setRole(
								this.roleRepository.findOneByName(AuthoritiesConstants.USUARIO_TERRITORIAL).get());
						this.userConfigurationRepository.save(userConfiguration);
					}
				}
			}
		}
		return user;
	}

	public Optional<UserDTO> updateUser(UserDTO userDTO) {
		return Optional.of(applicationUserRepository.findOne(userDTO.getId())).map(user -> {
			user.setUsername(userDTO.getUsername());
			user.setFirstName(userDTO.getFirstName());
			user.setLastName(userDTO.getLastName());
			user.setAdministrator(userDTO.getAdministrator());
			user.setBlocked(userDTO.getBlocked());
			// user.setPositions(userDTO.getPositions());
			// user.setPermissions(userDTO.getPermissions());
			applicationUserRepository.save(user);
			return user;
		}).map(UserDTO::new);

	}

	public Optional<User> findUser(Long id) {
		return Optional.of(applicationUserRepository.findOne(id));
	}

	public void changeUserPassword(Long id, String password) {
		User user = applicationUserRepository.findOne(id);
		user.setPassword(bcryptPasswordEncoder.encode(password));
		applicationUserRepository.save(user);
	}

	public void updateUser(Long id, String firstName, String lastName) {
		User user = applicationUserRepository.findOne(id);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		applicationUserRepository.save(user);
	}

	public List<User> findAllUsers() {
		ArrayList<User> res = new ArrayList<>();
		applicationUserRepository.findAll().forEach(res::add);
		return res;
	}

	public boolean resolvePermission(User authUser, User user, String permission) {
		if (authUser.getId().longValue() == user.getId())
			return true;
		Set<UserConfiguration> permissions = authUser.getPermissions();
		boolean isAdminSitmun = permissions.stream()
				.anyMatch(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_SITMUN));
		boolean isAdminOrganization = permissions.stream()
				.anyMatch(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION));

		if (isAdminSitmun)
			return true;

		// si tengo el rol de admin de territorio y el usuario tiene permisos asociados
		// a este territorio
		if (isAdminOrganization) {
			if (user.getId().longValue() != 0) {
				return this.getUserWithPermissionsByUsername(user.getUsername()).get().getPermissions().stream()
						.anyMatch(targetDomainObjectPermissions -> permissions.stream()
								.filter(p -> p.getRole().getName()
										.equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION))
								.map(UserConfiguration::getTerritory).map(Territory::getId).collect(Collectors.toList())
								.contains(targetDomainObjectPermissions.getTerritory().getId()));
			} else {
				return true;
			}
		}

		return false;
	}

	public Optional<User> getUserWithPermissionsByUsername(String name) {
		return applicationUserRepository.findOneWithPermissionsByUsername(name);
	}

}
