package org.sitmun.plugin.core.service;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;

@Service
public class UserService implements UserDetailsService {

  private UserRepository applicationUserRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public UserService(UserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
    super();
    this.applicationUserRepository = applicationUserRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> applicationUser = applicationUserRepository.findOneByUsername(username);
    if (!applicationUser.isPresent()) {
      throw new UsernameNotFoundException(username);
    }
    return new org.springframework.security.core.userdetails.User(applicationUser.get().getUsername(),
            applicationUser.get().getPassword(), emptyList());
  }
  /*
   * private org.springframework.security.core.userdetails.User
   * createSpringSecurityUser(String lowercaseLogin,
   * org.sitmun.plugin.core.domain.User user) { if (user.getBlocked()) { throw new
   * UserNotActivatedException("User " + lowercaseLogin + " was not activated"); }
   * List<GrantedAuthority> grantedAuthorities = user.getPermissions().stream()
   * .map(authority -> new SimpleGrantedAuthority(authority.getName()))
   * .collect(Collectors.toList()); return new
   * org.springframework.security.core.userdetails.User(user.getLogin(),
   * user.getPassword(), grantedAuthorities); }
   */

  public User createUser(User user) {
    if (user.getPassword() != null)
      user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
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
    user.setPassword(bCryptPasswordEncoder.encode(password));
    applicationUserRepository.save(user);
  }

  public void updateUser(Long id, String firstName, String lastName) {
    User user = applicationUserRepository.findOne(id);
    user.setFirstName(firstName);
    user.setLastName(lastName);
    applicationUserRepository.save(user);
  }

  public List<User> findAllUsers() {
    ArrayList<User> res = new ArrayList<User>();
    applicationUserRepository.findAll().forEach(res::add);
    return res;
  }

  public Page<User> findAllUsers(Pageable pageable) {
    return applicationUserRepository.findAll(pageable);
  }

}