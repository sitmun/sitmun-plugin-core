package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartografia;
import org.sitmun.plugin.core.domain.DisponibilidadCartografia;
import org.sitmun.plugin.core.domain.Territorio;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@DataJpaTest
public class CartografiaRepositoryTest {
    
    
    @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private CartografiaRepository repository;
    
    @Autowired
    private DisponibilidadCartografiaRepository disponibilidadCartografiaRepository;
 
    // write test cases here
    //(1,'admin','prCTmrOYKHQ=','Admin','Admin',1,0);
    //(2,'public','prCTmrOYKHQ=','','',0,0);
    private Cartografia item;

    private Set<DisponibilidadCartografia> disponibilidades;

    private Territorio territorio;
    
    @Before
    public void init() {
        item = new Cartografia();
        territorio = new Territorio();
        territorio.setBloqueado(false);
        territorio.setNombre("Territorio");
        
        
        entityManager.persist(territorio);
        item.setNombre("Admin");
        
    }

    @Test
    public void addCartografia() {
        Iterable<Cartografia> persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        
        repository.save(item);
        System.out.println(item.getId());

        DisponibilidadCartografia disponibilidad;
        disponibilidad = new DisponibilidadCartografia();
        //disponibilidad.setId(new DisponibilidadCartografiaId());
        disponibilidad.setTerritorio(territorio);
        disponibilidad.setFechaAlta(new Date());
        disponibilidad.setCartografia(item);
        
        entityManager.persistFlushFind(disponibilidad);
        
        System.out.println(disponibilidad.toString());
        
        //disponibilidades = new HashSet<DisponibilidadCartografia>();
        //disponibilidades.add(disponibilidad);
        
                
        
        //item.setDisponibilidades(disponibilidades);
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);
        
    }

}
