package org.sitmun.plugin.core.web.rest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartography;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.CartographyRepository;
import org.sitmun.plugin.core.repository.TerritoryRepository;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.is;
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
public class CartographyRestResourceIntTest {

  private static final String ADMIN_USERNAME = "admin";
  private static final String TERRITORY_NAME = "Territory Name";
  private static final String CARTOGRAPHY_NAME = "Cartographt Name";
  
  
  private static final String TERRITORY_URI = "http://localhost/api/territories";
  private static final String CARTOGRAPHY_URI = "http://localhost/api/cartographies";
  
  @Autowired
  CartographyRepository cartographyRepository;
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  private String token;
  private Cartography cartography;
  private Territory territory;
  
  @Autowired
  TerritoryRepository territoryRepository;
  
  @Before
  public void init() {
    territory = new Territory();
    territory.setBlocked(false);
    territory.setName(TERRITORY_NAME);

    cartography = new Cartography();
    cartography.setName(CARTOGRAPHY_NAME);
    
    token = tokenProvider.createToken(ADMIN_USERNAME);
  }
  

  @Test
  @WithMockUser(username=ADMIN_USERNAME)
  public void postTerritory() throws Exception {

	  String uri = mvc.perform(post(TERRITORY_URI)
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(territory))
    )
      .andExpect(status().isCreated()).andReturn().getResponse().getHeader("Location");

    mvc.perform(get( uri )
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.name", equalTo(TERRITORY_NAME)));

  }

  @Test
  @WithMockUser(username=ADMIN_USERNAME)
  public void postCartography() throws Exception {

	  String uri = mvc.perform(post(CARTOGRAPHY_URI)
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(cartography))
    )
      .andExpect(status().isCreated())
      .andReturn().getResponse().getHeader("Location");

    mvc.perform(get(uri)
      //.header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.name", equalTo(CARTOGRAPHY_NAME)));
  }

}
