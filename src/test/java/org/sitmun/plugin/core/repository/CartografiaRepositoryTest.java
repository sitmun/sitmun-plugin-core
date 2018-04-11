package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartografia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CartografiaRepositoryTest {

    @Autowired
    private CartografiaRepository repository;

    private Cartografia item;

    @Before
    public void init() {
        item = new Cartografia();
        item.setNombre("Test");
        item.setCapas(null);
        item.setCapaSeleccion(null);
        item.setConexion(null);
        item.setDisponibilidades(null);
        item.setEditable(true);
        item.setEscalaMaxima(null);
        item.setEscalaMaxima(null);
        item.setFechaAlta(new Date());
        item.setId(1);
        item.setOrden(0);
        item.setQueryable(true);
        item.setQueryAct(true);
        item.setQueryLay(true);
        item.setSeleccionable(true);
        item.setServicio(null);
        item.setServicioSeleccion(null);
        item.setTematizable(true);
        item.setTipLeyenda(null);
        item.setTipo(null);
        item.setTipoGeometria(null);
        item.setTransparencia(0);
        item.setUrlLeyenda(null);
        item.setUrlMetadato(null);
        item.setVisible(true);

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Cartografia> persistentItems = repository.findAll();
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

