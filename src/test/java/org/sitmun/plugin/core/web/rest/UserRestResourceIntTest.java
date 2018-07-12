package org.sitmun.plugin.core.web.rest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Role;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.domain.UserConfiguration;
import org.sitmun.plugin.core.repository.RoleRepository;
import org.sitmun.plugin.core.repository.TerritoryRepository;
import org.sitmun.plugin.core.repository.UserConfigurationRepository;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.AuthoritiesConstants;
import org.sitmun.plugin.core.security.TokenProvider;
import org.sitmun.plugin.core.service.UserService;
import org.sitmun.plugin.core.service.dto.UserDTO;
import org.sitmun.plugin.core.web.rest.dto.PasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.equalTo;
//import static org.hamcrest.CoreMatchers.shasItems;
import static org.hamcrest.Matchers.hasSize;
import static org.sitmun.plugin.core.security.SecurityConstants.HEADER_STRING;
import static org.sitmun.plugin.core.security.SecurityConstants.TOKEN_PREFIX;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserRestResourceIntTest {

  private static final String USER_USERNAME = "admin";
  private static final String TERRITORY1_ADMIN_USERNAME ="territory1-admin";
  private static final String TERRITORY1_USER_USERNAME ="territory1-user";
  private static final String TERRITORY2_USER_USERNAME ="territory2-user";
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
  UserConfigurationRepository userConfigurationRepository;
  
  @Autowired
  RoleRepository roleRepository;
  
  @Autowired
  TerritoryRepository territoryRepository;
  
  @Autowired
  UserService userService;
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  private String token;
  private User sitmunAdmin;
  
  private User organizacionAdmin;
  
  private User territory1User;
  
  private User territory2User;
  
  
  private Territory defaultTerritory;
  private Territory territory1;
  private Territory territory2;
  private Role sitmunAdminRole;
  private Role organizacionAdminRole;
  private Role territorialRole;

  @Before
  public void init() {
    token = tokenProvider.createToken(USER_USERNAME);
    
    sitmunAdminRole = new Role();
    sitmunAdminRole.setName(AuthoritiesConstants.ADMIN_SITMUN);    
    roleRepository.save(sitmunAdminRole);
    
    organizacionAdminRole = new Role();
    organizacionAdminRole.setName(AuthoritiesConstants.ADMIN_ORGANIZACION);    
    roleRepository.save(organizacionAdminRole);
    
    territorialRole = new Role();
    territorialRole.setName(AuthoritiesConstants.USUARIO_TERRITORIAL);    
    roleRepository.save(territorialRole);
    
    
    defaultTerritory = new Territory();
    defaultTerritory.setName("Territorio por defecto");
    territoryRepository.save(defaultTerritory);
    
    territory1 = new Territory();
    territory1.setName("Territorio 1");
    territoryRepository.save(territory1);
    
    territory2 = new Territory();
    territory2.setName("Territorio 2");
    territoryRepository.save(territory2);
    
    //Sitmun Admin
    sitmunAdmin = new User();
    sitmunAdmin.setAdministrator(USER_ADMINISTRATOR);
    sitmunAdmin.setBlocked(USER_BLOCKED);
    sitmunAdmin.setFirstName(USER_FIRSTNAME);
    sitmunAdmin.setLastName(USER_LASTNAME);
    sitmunAdmin.setPassword(USER_PASSWORD);
    sitmunAdmin.setUsername(USER_USERNAME);
    sitmunAdmin = userService.createUser(sitmunAdmin);
    
    UserConfiguration userConf = new UserConfiguration();
    userConf.setTerritory(defaultTerritory);
    userConf.setRole(sitmunAdminRole);
    userConf.setUser(sitmunAdmin);
    this.userConfigurationRepository.save(userConf);
    
    //Territory 1 Admin
    organizacionAdmin = new User();
    organizacionAdmin.setAdministrator(USER_ADMINISTRATOR);
    organizacionAdmin.setBlocked(USER_BLOCKED);
    organizacionAdmin.setFirstName(USER_FIRSTNAME);
    organizacionAdmin.setLastName(USER_LASTNAME);
    organizacionAdmin.setPassword(USER_PASSWORD);
    organizacionAdmin.setUsername(TERRITORY1_ADMIN_USERNAME );
    organizacionAdmin = userService.createUser(organizacionAdmin);
    
    userConf = new UserConfiguration();
    userConf.setTerritory(territory1);
    userConf.setRole(organizacionAdminRole);
    userConf.setUser(organizacionAdmin);
    this.userConfigurationRepository.save(userConf);
    
  //Territory 1 user
    territory1User = new User();
    territory1User.setAdministrator(false);
    territory1User.setBlocked(USER_BLOCKED);
    territory1User.setFirstName(USER_FIRSTNAME);
    territory1User.setLastName(USER_LASTNAME);
    territory1User.setPassword(USER_PASSWORD);
    territory1User.setUsername(TERRITORY1_USER_USERNAME );
    territory1User = userService.createUser(territory1User);
    
    userConf = new UserConfiguration();
    userConf.setTerritory(territory1);
    userConf.setRole(territorialRole);
    userConf.setUser(territory1User);
    this.userConfigurationRepository.save(userConf);
    
    //Territory 2 user
    territory2User = new User();
    territory2User.setAdministrator(false);
    territory2User.setBlocked(USER_BLOCKED);
    territory2User.setFirstName(USER_FIRSTNAME);
    territory2User.setLastName(USER_LASTNAME);
    territory2User.setPassword(USER_PASSWORD);
    territory2User.setUsername(TERRITORY2_USER_USERNAME );
    territory2User = userService.createUser(territory2User);
    
    userConf = new UserConfiguration();
    userConf.setTerritory(territory2);
    userConf.setRole(territorialRole);
    userConf.setUser(territory2User);
    
    this.userConfigurationRepository.save(userConf);
    
    
    
  }

  @After
  public void cleanup() {
    userConfigurationRepository.deleteAll();
    territoryRepository.deleteAll();
    roleRepository.deleteAll();
	userRepository.deleteAll();
    
  }

  @Test
  public void getUsersAsPublicFails() throws Exception {
	//TO DO
	//fail is expected
  }
  
  @Test
  public void getUsersAsTerritoryUserFails() throws Exception {
	//TO DO
	//fail is expected
  }
    
  
  @Test
  @WithMockUser(username=USER_USERNAME)
  public void createNewUserAsSitmunAdmin() throws Exception {
    UserDTO newUser = new UserDTO(sitmunAdmin);
    newUser.setId(null);
    newUser.setUsername(NEW_USER_USERNAME);

    String uri = mvc.perform(post("/api/users")
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
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
  @WithMockUser(username=USER_USERNAME)
  public void createDuplicatedUserAsSitmunAdminFails() throws Exception {
    UserDTO newUser = new UserDTO(sitmunAdmin);
    newUser.setId(null);

    mvc.perform(post("/api/users")
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
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
  @WithMockUser(username=USER_USERNAME)
  public void updateUserAsSitmunAdmin() throws Exception {
    UserDTO userDTO = new UserDTO(sitmunAdmin);
    userDTO.setFirstName(USER_CHANGEDFIRSTNAME);
    userDTO.setLastName(USER_CHANGEDLASTNAME);

    mvc.perform(put(USER_URI + "/" + sitmunAdmin.getId())
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(userDTO))
    )
      .andExpect(status().isNoContent());

    mvc.perform(get(USER_URI + "/" + sitmunAdmin.getId())
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.firstName", equalTo(USER_CHANGEDFIRSTNAME)))
      .andExpect(jsonPath("$.lastName", equalTo(USER_CHANGEDLASTNAME)));
  }
  
  @Test
  @WithMockUser(username=USER_USERNAME)
  public void getUsersAsSitmunAdmin() throws Exception {
    mvc.perform(get(USER_URI )      
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8)).andExpect(jsonPath("$._embedded.users",  hasSize(4)));
  }
  
  @Test
  @WithMockUser(username=TERRITORY1_ADMIN_USERNAME)
  public void getUsersAsOrganizacionAdmin() throws Exception {
    mvc.perform(get(USER_URI )
      
    ).andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8)).andExpect(jsonPath("$._embedded.users",  hasSize(2)));
  }
  

  @Test
  @WithMockUser(username=USER_USERNAME)
  public void updateUserPasswordAsSitmunAdmin() throws Exception {
    PasswordDTO passwordDTO = new PasswordDTO();
    passwordDTO.setPassword(USER_CHANGEDPASSWORD);

    mvc.perform(post(USER_URI + "/" + sitmunAdmin.getId())
//      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(passwordDTO))
    )
      .andExpect(status().isOk());
  }
  
  
  @Test
  public void getUsersAsOrganizationAdmin() throws Exception {
	//TO DO
	//It returns only the users linked to my territory
	//ok is expected
  }
  
  
  @Test
  public void createNewUserAsOrganizationAdmin() throws Exception {
	//TO DO
	//Create new user by an organization admin user (ADMIN DE ORGANIZACION)
	//ok is expected. The new user has roles linked to my organization territory
  }
  
  @Test
  public void assignRoleToUserAsOrganizationAdmin() throws Exception {
	//TO DO
	//ok is expected. The new user has roles linked to my organization territory
  }
  
  
  @Test
  public void updateUserAsOrganizationAdmin() throws Exception {
	//TO DO
	//Update user (linked to the same organization)  by an organization admin user (ADMIN DE ORGANIZACION)
	//ok is expected
  }
  
  @Test
  public void updateUserPasswordAsOrganizationAdmin() throws Exception {
	//TO DO
	//Update user password (linked to the same organization)  by an organization admin user (ADMIN DE ORGANIZACION)
	//ok is expected
  }
  
  
  @Test
  public void assignRoleToUserAsOtherOrganizationAdminFails() throws Exception {
	//TO DO
	//fail is expected. No permission to assign territory role to user if don't have territory role
  }
  

  @Test
  public void updateUserAsOtherOrganizationAdminFails() throws Exception {
	//TO DO
	//Update user (linked to another organization)  by an organization admin user (ADMIN DE ORGANIZACION)
	//fail is expected (no permission)
  }
  
  @Test
  public void updateUserPasswordAsOtherOrganizationAdminFails() throws Exception {
	//TO DO
	//Update user password (linked to another organization)  by an organization admin user (ADMIN DE ORGANIZACION)
	//fail is expected (no permission)
  }

}
