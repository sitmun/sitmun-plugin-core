
package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.TerritoryType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TerritoryRepositoryTest {

    @Autowired
    private TerritoryRepository territoryRepository;

    @Autowired
    private TerritoryTypeRepository territoryTypeRepository;

    private Territory territory;

    /**
     * @throws JsonProcessingException
     */
    @Before
    public void init() throws JsonProcessingException {
        TerritoryType type = new TerritoryType();
        type.setId(1);
        type.setName("tipo Territorio 1");

        territoryTypeRepository.save(type);
        System.out.println(this.serialize(type));

        territory = new Territory();
        territory.setName("Admin");
        territory.setScope(null);
        territory.setBlocked(false);
        territory.setAddress(null);
        territory.setEmail("email@email.org");
        territory.setExt(null);
        territory.setCreatedDate(new Date());
        territory.setId(1);
        territory.setLogo(null);
        territory.setMembers(null);
        territory.setOrganizationName("Test");
        territory.setComments(null);
        territory.setType(type);

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Territory> persistentItems = territoryRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        territoryRepository.save(territory);
        persistentItems = territoryRepository.findAll();
        assertThat(persistentItems).hasSize(1);

    }
    
    /*
    @Test
    public void removeTerritoryMember() throws JsonProcessingException {
        TerritoryType type = new TerritoryType();
        type.setId(1);
        type.setName("tipo Territorio 1");
        territoryTypeRepository.save(type);
        Territory child = new Territory();
        child.setName("Child");
        child.setType(type);
        territoryRepository.save(child);
        Territory parent = new Territory();
        parent.setName("Parent");
        parent.setType(type);
        parent.getMembers().add(child);
        territoryRepository.save(parent);
        territoryRepository.delete(child);
    }
    */

    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public Territory getTerritory() {
    	return this.territory;
    }

}
