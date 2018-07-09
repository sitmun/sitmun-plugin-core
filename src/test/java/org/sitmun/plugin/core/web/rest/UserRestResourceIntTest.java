package org.sitmun.plugin.core.web.rest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.TokenProvider;
import org.sitmun.plugin.core.service.UserService;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.sitmun.plugin.core.web.rest.dto.PasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.sitmun.plugin.core.security.SecurityConstants.HEADER_STRING;
import static org.sitmun.plugin.core.security.SecurityConstants.TOKEN_PREFIX;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserRestResourceIntTest {

  private static final String USER_USERNAME = "admin";
  private static final String NEW_USER_USERNAME = "admin_new";
  private static final String USER_PASSWORD = "admin";
  private static final String USER_CHANGEDPASSWORD = "nimda";
  private static final String USER_FIRSTNAME = "Admin";
  private static final String USER_CHANGEDFIRSTNAME = "Administrator";
  private static final String USER_LASTNAME = "Admin";
  private static final String USER_CHANGEDLASTNAME = "Territory 1";
  private static final Boolean USER_BLOCKED = false;
  private static final Boolean USER_ADMINISTRATOR = true;
  //private static final String DEFAULT_USER_URI = "http://localhost/api/users/1";
  private static final String USER_URI = "http://localhost/api/users";
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserService userService;
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  private String token;
  private User user;

  @Before
  public void init() {
    token = tokenProvider.createToken(USER_USERNAME);
    user = new User();
    user.setAdministrator(USER_ADMINISTRATOR);
    user.setBlocked(USER_BLOCKED);
    user.setFirstName(USER_FIRSTNAME);
    user.setLastName(USER_LASTNAME);
    user.setPassword(USER_PASSWORD);
    user.setUsername(USER_USERNAME);
    user = userService.createUser(user);
  }

  @After
  public void cleanup() {
    userRepository.deleteAll();
  }

  @Test
  public void createNewUser() throws Exception {
    UserDTO newUser = new UserDTO(user);
    newUser.setId(null);
    newUser.setUsername(NEW_USER_USERNAME);

    String uri = mvc.perform(post("/api/users")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(newUser))
    )
      .andExpect(status().isCreated())
      .andReturn().getResponse().getHeader("Location");

    mvc.perform(get(uri)
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.username", equalTo(NEW_USER_USERNAME)));
  }

  @Test
  public void createDuplicatedUserFails() throws Exception {
    UserDTO newUser = new UserDTO(user);
    newUser.setId(null);

    mvc.perform(post("/api/users")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(newUser))
    )
      .andExpect(status().isConflict());
  }

  /*
   * @Transactional
   *
   * @Test public void getUsers() throws Exception { mvc.perform(
   * post("/api/users").header(SecurityConstants.HEADER_STRING,
   * SecurityConstants.TOKEN_PREFIX + token)
   * .contentType(MediaType.APPLICATION_JSON_UTF8).content(Util.
   * convertObjectToJsonBytes(user))) ;
   *
   *
   * mvc.perform(get("/api/users").header(SecurityConstants.HEADER_STRING,
   * SecurityConstants.TOKEN_PREFIX +
   * token)).andDo(print()).andExpect(status().isOk()) ;
   *
   * }
   */

  @Test
  public void updateUser() throws Exception {
    UserDTO userDTO = new UserDTO(user);
    userDTO.setFirstName(USER_CHANGEDFIRSTNAME);
    userDTO.setLastName(USER_CHANGEDLASTNAME);

    mvc.perform(put(USER_URI + "/" + user.getId())
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(userDTO))
    )
      .andExpect(status().isNoContent());

    mvc.perform(get(USER_URI + "/" + user.getId())
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.firstName", equalTo(USER_CHANGEDFIRSTNAME)))
      .andExpect(jsonPath("$.lastName", equalTo(USER_CHANGEDLASTNAME)));
  }
  @Test
  public void updateUserPassword() throws Exception {
    PasswordDTO passwordDTO = new PasswordDTO();
    passwordDTO.setPassword(USER_CHANGEDPASSWORD);

    mvc.perform(post(USER_URI + "/" + user.getId())
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(passwordDTO))
    )
      .andExpect(status().isOk());
  }

}
