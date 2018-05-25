package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.UserConfiguration;
import org.sitmun.plugin.core.domain.Role;
import org.sitmun.plugin.core.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;
      
    private User user;

    @Before
    public void init() {
        user = new User();
        user.setFirstName("Admin");
        user.setLastName("AdminLastName");
        user.setAdministrator(true);
        user.setBlocked(false);
        user.setPassword("prCTmrOYKHQ=");
        user.setUsername("admin");
        user.setPositions(null);
        user.setId(1);
        user.setPermissions(null);
        
        Role role = new Role();
        role.setId(0);
        role.setName("rol-admin");
        role.setComments("rol de administrador");
        TerritoryRepositoryTest terrTest = new TerritoryRepositoryTest();
        UserConfiguration conf = new UserConfiguration();
        conf.setId(1);
        conf.setUser(user);
        conf.setRole(role);
        conf.setTerritory(terrTest.getTerritory());

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<User> persistentItems = userRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        userRepository.save(user);
        System.out.println(this.serialize(user));
        persistentItems = userRepository.findAll();
        assertThat(persistentItems).hasSize(1);

    }

    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public User getUser() {
    	return this.user;
    }

}
