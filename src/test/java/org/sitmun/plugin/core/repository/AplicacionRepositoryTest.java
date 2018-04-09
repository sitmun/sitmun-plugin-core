package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Aplicacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@RunWith(SpringRunner.class)
@DataJpaTest
public class AplicacionRepositoryTest {
    
    @Autowired
    private AplicacionRepository repository;
 
    private Aplicacion item;
    
    @Before
    public void init() {
        item = new Aplicacion();
        item.setId(1);
        item.setNombre("Test");
        item.setFechaAlta(new Date());
        item.setArbol(null);
        item.setAutoRefrescoArbol(true);
        item.setEscalas(null);
        item.setFondos(null);
        item.setMapaSituacion(null);
        item.setParametros(null);
        item.setProyecciones(null);
        item.setRolesDisponibles(null);
        item.setTema(null);
        item.setTipo(null);
        item.setTitulo("Test");
        
    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Aplicacion> persistentItems = repository.findAll();
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
