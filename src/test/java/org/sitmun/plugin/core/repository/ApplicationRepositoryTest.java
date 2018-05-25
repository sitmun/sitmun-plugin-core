package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;



@RunWith(SpringRunner.class)
@DataJpaTest
public class ApplicationRepositoryTest {
    
    @Autowired
    private AplicacionRepository repository;
    
    @Autowired
    private CartographyGroupRepository grupoCartografiaRepository;
    
    @Autowired
    private BackgroundRepository fondoRepository;
    
    private Application item;

   
    @Before
    public void init() {
        item = new Application();
        item.setId(1);
        item.setName("Test");
        item.setCreatedDate(new Date());
        item.setTrees(null);
        item.setTreeAutoRefresh(true);
        item.setScales(null);
        item.setSituationMap(null);
        item.setParameters(null);
        item.setProjections(null);        
        Role rol = new Role();
        rol.setName("Rol 1");
        item.getAvailableRoles().add(rol);
        //rol.setAplicacion(item);
        
        
        ApplicationBackground applicationBackground = new ApplicationBackground();
        applicationBackground.setApplication(item);
        Background background = new Background();
        background.setActive(true);
        background.setDescription(null);
        background.setName("fondo");
        
        CartographyGroup cartographyGroup;
        cartographyGroup = new CartographyGroup();
        cartographyGroup.setName("Grupo cartografía");
        grupoCartografiaRepository.save(cartographyGroup);
        
        
        background.setCartographyGroup(cartographyGroup);
        background.setCreatedDate(new Date());
        applicationBackground.setBackground(background );
        applicationBackground.setOrder(1);
        fondoRepository.save(background);
        
        
        item.getBackgrounds().add(applicationBackground );
        
        ApplicationParameter parameter = new ApplicationParameter();
        parameter.setApplication(item);
        parameter.setName("param1");
        parameter.setType("tipo1");
        parameter.setValue("valor1");
        
        item.setParameters(new HashSet<>());
        
        item.getParameters().add(parameter);
        
        item.setTheme(null);
        item.setType(null);
        item.setTitle("Test");
        
    }

    @Test
    public void addAndRemoveItem() throws JsonProcessingException {
        Iterable<Application> persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        repository.save(item);
        System.out.println(this.serialize(item));

        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);
        item = persistentItems.iterator().next();
        assertThat(item.getAvailableRoles().size()).isGreaterThan(0);
        assertThat(item.getBackgrounds().size()).isGreaterThan(0);
        assertThat(item.getParameters().size()).isGreaterThan(0);
        repository.delete(item);
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        
    }
    
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public Application getAplication () {
    	return this.item;
    }

}
