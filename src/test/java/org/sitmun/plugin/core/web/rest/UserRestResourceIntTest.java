package org.sitmun.plugin.core.web.rest;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartography;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.SecurityConstants;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.HashMap;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import org.junit.runners.MethodSorters;
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@AutoConfigureMockMvc
public class UserRestResourceIntTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;

	@Autowired
	TokenProvider tokenProvider;

	private String token;

	private User user;

	private static final String USER_USERNAME = "admin";
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
	private static final String NEW_USER_URI = "http://localhost/api/users/1";

	@Before
	public void init() {
		//userRepository.deleteAll();
		token = tokenProvider.createToken(USER_USERNAME);
		user = new User();
		user.setAdministrator(USER_ADMINISTRATOR);
		user.setBlocked(USER_BLOCKED);
		user.setFirstName(USER_FIRSTNAME);
		user.setLastName(USER_LASTNAME);
		user.setPassword(USER_PASSWORD);
		user.setUsername(USER_USERNAME);
		//userService.createUser(user);
	}

	@Test
	@Transactional
	public void createUser() throws Exception {

		mvc.perform(post("/api/users").header(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token)
				.contentType(MediaType.APPLICATION_JSON_UTF8).content(Util.convertObjectToJsonBytes(user)))
				.andExpect(status().isCreated()).andExpect(header().string("Location", is(NEW_USER_URI)));

		mvc.perform(get(NEW_USER_URI ).header(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token))
				.andExpect(status().isOk()).andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
				.andExpect(jsonPath("$.username", equalTo(USER_USERNAME)));

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
		userRepository.deleteAll();
		user = userService.createUser(user);
		//user = this.userRepository.save(user);
		user.setFirstName(USER_CHANGEDFIRSTNAME);
		user.setLastName(USER_CHANGEDLASTNAME);
		mvc.perform(put(USER_URI+"/"+user.getId() ).header(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token)
				.contentType(MediaType.APPLICATION_JSON_UTF8).content(Util.convertObjectToJsonBytes(new UserDTO(user))))
				.andExpect(status().isNoContent());

		mvc.perform(get(USER_URI+"/"+user.getId() ).header(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX + token)).andExpect(status().isOk())
				.andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
				.andExpect(jsonPath("$.firstName", equalTo(USER_CHANGEDFIRSTNAME)))
				.andExpect(jsonPath("$.lastName", equalTo(USER_CHANGEDLASTNAME)));
	}
	
	@Test
	public void updateUserPassword() throws Exception {
		userRepository.deleteAll();
		user = userService.createUser(user);
		PasswordDTO password = new PasswordDTO();
		password.setPassword(USER_CHANGEDPASSWORD);
		mvc.perform(post(USER_URI+"/"+user.getId() +"/change-password" ).header(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token)
				.contentType(MediaType.APPLICATION_JSON_UTF8).content(Util.convertObjectToJsonBytes(password)))
				.andExpect(status().isOk());

	}

}
