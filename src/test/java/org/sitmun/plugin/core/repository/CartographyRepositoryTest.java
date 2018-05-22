package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartography;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CartographyRepositoryTest {

    @Autowired
    private CartographyRepository repository;

    private Cartography item;

    /**
     * 
     */
    @Before
    public void init() {
        item = new Cartography();
        item.setName("Test");
        item.setLayers(null);
        item.setSelectionLayer(null);
        item.setConnection(null);
        item.setAvailabilities(null);
        item.setEditable(true);
        item.setMaximumScale(null);
        item.setMinimumScale(null);
        item.setCreatedDate(new Date());
        item.setId(1);
        item.setOrder(0);
        item.setQueryable(true);
        item.setQueryAct(true);
        item.setQueryLay(true);
        item.setSelectable(true);
        item.setService(null);
        item.setSelectionService(null);
        item.setThemeable(true);
        item.setLegendTip(null);
        item.setType(null);
        item.setGeometryType(null);
        item.setTransparency(0);
        item.setLegendUrl(null);
        item.setMetadataUrl(null);
        item.setVisible(true);

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Cartography> persistentItems = repository.findAll();
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

