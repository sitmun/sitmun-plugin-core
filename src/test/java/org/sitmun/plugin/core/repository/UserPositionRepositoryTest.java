package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.UserPosition;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;



@RunWith(SpringRunner.class)
@DataJpaTest
public class UserPositionRepositoryTest {
    
    @Autowired
    private UserPositionRepository userPositionRepository;
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TerritoryRepository territorioRepository;
 
    private UserPosition userPosition;

    private Territory territory;

    private User user;
    
    @Before
    public void init() {
        user = new User();
        user.setFirstName("Admin");
        user.setLastName("Admin");
        user.setAdministrator(true);
        user.setBlocked(false);
        user.setPassword("prCTmrOYKHQ=");
        user.setUsername("admin");
        user.setPositions(null);
        //usuario.setId(1);
        user.setPermissions(null);
        userRepository.save(user);
        
        //UsuarioRepositoryTest userTest = new UsuarioRepositoryTest();

        territory = new Territory();
        //territorio.setId(1);
        territory.setName("Admin");
        territory.setScope(null);
        territory.setBlocked(false);
        territory.setAddress(null);
        territory.setEmail("email@email.org");
        territory.setExt(null);
        territory.setCreatedDate(new Date());
        territory.setLogo(null);
        territory.setMembers(null);
        territory.setOrganizationName("Test");
        territory.setComments(null);
        territorioRepository.save(territory);
        
        //TerritorioRepositoryTest terrTest = new TerritorioRepositoryTest();

        
        userPosition = new UserPosition();
        //cargo.setId(1);
        userPosition.setName("Test");
        userPosition.setEmail(null);
        userPosition.setCreatedDate(new Date());
        userPosition.setDatedDate(null);
        userPosition.setOrganization("Test");
        userPosition.setTerritory(territory);
        userPosition.setUser(user);
        /*cargo.setTerritorio(terrTest.getTerritorio());
        cargo.setUsuario(userTest.getUsuario());*/
        
    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<UserPosition> persistentItems = userPositionRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        userPositionRepository.save(userPosition);
        System.out.println(this.serialize(userPosition));
        persistentItems = userPositionRepository.findAll();
        assertThat(persistentItems).hasSize(1);                
        
    }
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }

}
