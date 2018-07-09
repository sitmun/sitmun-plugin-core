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
import org.sitmun.plugin.core.web.rest.dto.LoginDTO;
import org.sitmun.plugin.core.web.rest.dto.PasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.HashMap;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.startsWith;
import static org.sitmun.plugin.core.security.SecurityConstants.HEADER_STRING;
import static org.sitmun.plugin.core.security.SecurityConstants.TOKEN_PREFIX;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AccountRestResourceIntTest {

  private static final String USER_USERNAME = "admin";
  private static final String USER_PASSWORD = "admin";
  private static final String USER_CHANGEDPASSWORD = "nimda";
  private static final String USER_FIRSTNAME = "Admin";
  private static final String USER_CHANGEDFIRSTNAME = "Administrator";
  private static final String USER_LASTNAME = "Admin";
  private static final String USER_CHANGEDLASTNAME = "Territory 1";
  private static final Boolean USER_BLOCKED = false;
  private static final Boolean USER_ADMINISTRATOR = true;
  private static final String ACCOUNT_URI = "/api/account";
  private static final String AUTHENTICATION_URI = "/api/authenticate";
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserService userService;
  private String token;
  private User user;
  private String expiredToken;

  @Before
  public void init() {
    expiredToken = Jwts.builder()
      .setSubject(USER_USERNAME)
      .signWith(SignatureAlgorithm.HS512, tokenProvider.getSecretKey().getBytes())
      .setExpiration(new Date()).compact();
    token = tokenProvider.createToken(USER_USERNAME);

    user = new User();
    user.setAdministrator(USER_ADMINISTRATOR);
    user.setBlocked(USER_BLOCKED);
    user.setFirstName(USER_FIRSTNAME);
    user.setLastName(USER_LASTNAME);
    user.setPassword(USER_PASSWORD);
    user.setUsername(USER_USERNAME);
    userService.createUser(user);
  }

  @After
  public void cleanup() {
    userRepository.deleteAll();
  }

  @Test
  public void login() throws Exception {
    LoginDTO login = new LoginDTO();
    login.setUsername(USER_USERNAME);
    login.setPassword(USER_PASSWORD);
    mvc.perform(post(AUTHENTICATION_URI)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(login))
    )
      .andExpect(status().isOk())
      .andExpect(header().string(HEADER_STRING, startsWith(TOKEN_PREFIX)));
  }

  @Test
  public void recoverAccount() throws Exception {
    mvc.perform(get(ACCOUNT_URI)
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.firstName", equalTo(USER_FIRSTNAME)))
      .andExpect(jsonPath("$.lastName", equalTo(USER_LASTNAME)));
  }

  @Test
  public void recoverAccountExpiredToken() throws Exception {
    mvc.perform(get(ACCOUNT_URI)
      .header(HEADER_STRING, TOKEN_PREFIX + expiredToken)
    )
      .andExpect(status().isUnauthorized());
  }

  @Test
  public void updateAccount() throws Exception {
    user.setFirstName(USER_CHANGEDFIRSTNAME);
    user.setLastName(USER_CHANGEDLASTNAME);
    mvc.perform(post(ACCOUNT_URI)
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(new UserDTO(user)))
    )
      .andExpect(status().isOk());

    mvc.perform(get(ACCOUNT_URI)
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.firstName", equalTo(USER_CHANGEDFIRSTNAME)))
      .andExpect(jsonPath("$.lastName", equalTo(USER_CHANGEDLASTNAME)));
  }

  @Test
  public void updateAccountPassword() throws Exception {
    PasswordDTO password = new PasswordDTO();
    password.setPassword(USER_CHANGEDPASSWORD);
    mvc.perform(post(ACCOUNT_URI + "/change-password")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(password))
    )
      .andExpect(status().isOk());

    HashMap<String, String> login = new HashMap<>();
    login.put("username", USER_USERNAME);
    login.put("password", USER_CHANGEDPASSWORD);
    mvc.perform(post(AUTHENTICATION_URI)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(login))
    )
      .andExpect(status().isOk())
      .andExpect(header().string(HEADER_STRING, startsWith(TOKEN_PREFIX)));
  }

}
