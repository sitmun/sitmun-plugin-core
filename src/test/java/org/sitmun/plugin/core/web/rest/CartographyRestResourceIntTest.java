package org.sitmun.plugin.core.web.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartography;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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

  private static final String USERNAME = "admin";
  private static final String TERRITORY_NAME = "Territory Name";
  private static final String CARTOGRAPHY_NAME = "Cartographt Name";
  private static final String NEW_TERRITORY_URI = "http://localhost/api/territories/1";
  private static final String NEW_CARTOGRAPHY_URI = "http://localhost/api/cartographies/1";
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  private String token;
  private Cartography cartography;
  private Territory territory;

  @Before
  public void init() {
    territory = new Territory();
    territory.setBlocked(false);
    territory.setName(TERRITORY_NAME);

    cartography = new Cartography();
    cartography.setName(CARTOGRAPHY_NAME);

    token = tokenProvider.createToken(USERNAME);
  }

  @Test
  public void postTerritory() throws Exception {

    mvc.perform(post("/api/territories")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(territory))
    )
      .andExpect(status().isCreated())
      .andExpect(header().string("Location", is(NEW_TERRITORY_URI)));

    mvc.perform(get("/api/territories/1")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.name", equalTo(TERRITORY_NAME)));

  }

  @Test
  public void postCartograpy() throws Exception {

    mvc.perform(post("/api/cartographies")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(Util.convertObjectToJsonBytes(cartography))
    )
      .andExpect(status().isCreated())
      .andExpect(header().string("Location", is(NEW_CARTOGRAPHY_URI)));

    mvc.perform(get("/api/cartographies/1")
      .header(HEADER_STRING, TOKEN_PREFIX + token)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(Util.APPLICATION_HAL_JSON_UTF8))
      .andExpect(jsonPath("$.name", equalTo(CARTOGRAPHY_NAME)));
  }
}
