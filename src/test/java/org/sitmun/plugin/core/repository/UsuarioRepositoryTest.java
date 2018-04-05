package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@DataJpaTest
public class UsuarioRepositoryTest {
    
    
    @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private UsuarioRepository repository;
 
    // write test cases here
    //(1,'admin','prCTmrOYKHQ=','Admin','Admin',1,0);
    //(2,'public','prCTmrOYKHQ=','','',0,0);
    private Usuario item;
    
    @Before
    public void init() {
        item = new Usuario();
        item.setNombre("Admin");
        item.setApellido("Admin");
        item.setAdministrador(true);
        item.setBloqueado(false);
        item.setPassword("prCTmrOYKHQ=");
        item.setUsername("admin");
        
    }

    @Test
    public void addItem() {
        Iterable<Usuario> persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        repository.save(item);
        System.out.println(item.getId());
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);                
        
    }

}
