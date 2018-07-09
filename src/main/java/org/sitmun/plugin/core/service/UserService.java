package org.sitmun.plugin.core.service;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;

@Service
public class UserService{

  private UserRepository applicationUserRepository;
  private PasswordEncoder bcryptPasswordEncoder;

  public UserService(UserRepository applicationUserRepository, PasswordEncoder bcryptPasswordEncoder) {
    super();
    this.applicationUserRepository = applicationUserRepository;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }

  public User createUser(User user) {
    if (user.getPassword() != null) {
      user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    }
    return applicationUserRepository.save(user);
  }

  public Optional<UserDTO> updateUser(UserDTO userDTO) {
    return Optional.of(applicationUserRepository.findOne(userDTO.getId())).map(user -> {
      user.setUsername(userDTO.getUsername());
      user.setFirstName(userDTO.getFirstName());
      user.setLastName(userDTO.getLastName());
      user.setAdministrator(userDTO.getAdministrator());
      user.setBlocked(userDTO.getBlocked());
      //user.setPositions(userDTO.getPositions());
      //user.setPermissions(userDTO.getPermissions());
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

  public Page<User> findAllUsers(Pageable pageable) {
    return applicationUserRepository.findAll(pageable);
  }

}