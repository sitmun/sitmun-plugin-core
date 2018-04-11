package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Arbol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;



@RunWith(SpringRunner.class)
@DataJpaTest
public class ArbolRepositoryTest {
    
    @Autowired
    private ArbolRepository repository;
 
    private Arbol item;
    
    @Before
    public void init() {
        item = new Arbol();
        item.setId(1);
        item.setNombre("Test");
        
    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Arbol> persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        repository.save(item);
        System.out.println(this.serialize(item));
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);                
        
    }
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }

}
