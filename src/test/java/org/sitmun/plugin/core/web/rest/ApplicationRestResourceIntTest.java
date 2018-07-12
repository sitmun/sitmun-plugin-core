package org.sitmun.plugin.core.web.rest;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.repository.AplicacionRepository;
import org.sitmun.plugin.core.repository.TerritoryRepository;
import org.sitmun.plugin.core.repository.UserRepository;
import org.sitmun.plugin.core.security.TokenProvider;
import org.sitmun.plugin.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationRestResourceIntTest {
	

  private static final String USER_USERNAME = "admin";
  private static final String USER_PASSWORD = "admin";

  private static final String USER_FIRSTNAME = "Admin";
  private static final String USER_LASTNAME = "Admin";
  private static final String USER_CHANGEDLASTNAME = "Territory 1";
  private static final Boolean USER_BLOCKED = false;
  private static final Boolean USER_ADMINISTRATOR = true;
  //private static final String DEFAULT_USER_URI = "http://localhost/api/users/1";
  private static final String USER_URI = "http://localhost/api/users";
  private static final String APP_URI = "http://localhost/api/applications";
  @Autowired
  AplicacionRepository applicationRepository;
  //@Autowired
  //TerritoryService territoryService;
  @Autowired
  TokenProvider tokenProvider;
  @Autowired
  private MockMvc mvc;
  private String token;
  private Territory territory;

  @Before
  public void init() {
    token = tokenProvider.createToken(USER_USERNAME);
    territory = new Territory();
    //Create user
    //Create territory
    //Create role
    //Create application
    
    
  }

  @After
  public void cleanup() {
	  applicationRepository.deleteAll();
  }


  	@Test
	public void getApplicationsAsPublic() {
		//TO DO
		//ok is expected
	}
  	
  	@Test
	public void getApplicationsAsTerritorialUser() {
		//TO DO
		//ok is expected
	}
  	
  	@Test
	public void getApplicationsAsSitumunAdmin() {
		//TO DO
		//ok is expected
	}
  	
  	@Test
	public void getApplicationsAsOrganizationAdmin() {
		//TO DO
		//ok is expected
	}
  
  	@Test
	public void setAvailableRolesAsPublicFails() {
		//TO DO
		//fail is expected
	}
  	
  	@Test
	public void setAvailableRolesAsTerritorialUserFails() {
		//TO DO
		//fail is expected
	}
  	
  	@Test
	public void setAvailableRolesAsSitmunAdmin() {
		//TO DO
		//Update available roles for the app as an admin user
		//ok is expected
	}
	
	@Test
	public void setTreeAsSitmunAdmin() {
		//TO DO
		//Update tree for the app as an admin user
		//ok is expected
	}
	
	@Test
	public void setBackgroundAsSitmunAdmin() {
		//TO DO
		//Update background for the app as an admin user
		//ok is expected
	}
	
	@Test
	public void setAvailableRolesAsOrganizationAdmin() {
		//TO DO
		//Update available roles for the app (linked to the same organization) as an organization admin user 
		//ok is expected
	}
	
	@Test
	public void setTreeAsOrganizationAdmin() {
		//TO DO
		//Update tree for the app (linked to the same organization) as an organization admin user 
		//ok is expected
	}
	
	@Test
	public void setBackgroundAsOrganizationAdmin() {
		//TO DO
		//Update background for the app (linked to the same organization) as an organization admin user 
		//ok is expected
	}
	
	@Test
	public void setAvailableRolesAsOtherOrganizationAdminFails() {
		//TO DO
		//Update available roles for the app (linked to another organization) as an organization admin user 
		//fail is expected
	}
	
	@Test
	public void setTreeAsOtherOrganizationAdminFails() {
		//TO DO
		//Update tree for the app (linked to another organization) as an organization admin user 
		//fail is expected
	}
	
	@Test
	public void setBackgroundAsOtherOrganizationAdminFails() {
		//TO DO
		//Update background for the app (linked to another organization) as an organization admin user 
		//fail is expected
	}

}
