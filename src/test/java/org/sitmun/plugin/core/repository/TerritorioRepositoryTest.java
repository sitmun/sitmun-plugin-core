
package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Territorio;
import org.sitmun.plugin.core.domain.TipoTerritorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TerritorioRepositoryTest {

    @Autowired
    private TerritorioRepository territorioRepository;

    @Autowired
    private TipoTerritorioRepository tipoTerritorioRepository;

    private Territorio territorio;

    private TipoTerritorio tipo;

    @Before
    public void init() throws JsonProcessingException {
        TipoTerritorio tipo = new TipoTerritorio();
        tipo.setId(1);
        tipo.setNombre("tipo Territorio 1");

        tipoTerritorioRepository.save(tipo);
        System.out.println(this.serialize(tipo));

        territorio = new Territorio();
        territorio.setNombre("Admin");
        territorio.setAmbito(null);
        territorio.setBloqueado(false);
        territorio.setDireccion(null);
        territorio.setEmail("email@email.org");
        territorio.setExt(null);
        territorio.setFechaAlta(new Date());
        territorio.setId(1);
        territorio.setLogo(null);
        territorio.setMiembros(null);
        territorio.setNombreAdministracion("Test");
        territorio.setObservaciones(null);
        territorio.setTipo(tipo);

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Territorio> persistentItems = territorioRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        territorioRepository.save(territorio);
        System.out.println(this.serialize(territorio));
        persistentItems = territorioRepository.findAll();
        assertThat(persistentItems).hasSize(1);

    }

    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public Territorio getTerritorio() {
    	return this.territorio;
    }

}
