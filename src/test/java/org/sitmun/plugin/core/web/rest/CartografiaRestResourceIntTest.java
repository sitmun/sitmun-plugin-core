package org.sitmun.plugin.core.web.rest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cartografia;
import org.sitmun.plugin.core.domain.DisponibilidadCartografia;
import org.sitmun.plugin.core.domain.DisponibilidadCartografiaId;
import org.sitmun.plugin.core.domain.Territorio;
import org.sitmun.plugin.core.domain.Usuario;
import org.sitmun.plugin.core.repository.TerritorioRepository;
import org.sitmun.plugin.core.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class CartografiaRestResourceIntTest {
    
    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    
    @Autowired
    private TerritorioRepository territorioRepository;

 
    // write test cases here
    //(1,'admin','prCTmrOYKHQ=','Admin','Admin',1,0);
    //(2,'public','prCTmrOYKHQ=','','',0,0);
    private Cartografia cartografia;
    private Territorio territorio;
    @Before
    public void init() {
        cartografia= new Cartografia();
        territorio = new Territorio();
        territorio.setBloqueado(false);
        territorio.setNombre("Territorio");
        cartografia.setNombre("Cartografia");
        
    }


    @Test
    public void addCartografia() throws Exception{
        
        //TODO Pre añado territorio
        //TODO Añado rol vinculado a a
        /*
        Iterable<Usuario> persistentItems = usuarioRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        repository.save(item);
        System.out.println(item.getId());
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);
        */
       mvc.perform(post("/api/territorios").header("Accept", "application/json").content(serialize(territorio)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated())
               .andDo(MockMvcResultHandlers.print());
        mvc.perform(get("/api/territorios/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre", equalTo("Territorio")));
        
        
        DisponibilidadCartografia disponibilidad;
        disponibilidad = new DisponibilidadCartografia();
        //disponibilidad.setId(new DisponibilidadCartografiaId());
        territorio = new Territorio();
        territorio.setId(1);
        disponibilidad.setTerritorio(territorio);
        disponibilidad.setFechaAlta(new Date());
        /*
        cartografia = new Cartografia();
        cartografia.setId(1);
        disponibilidad.setCartografia(cartografia);
*/
        cartografia.getDisponibilidades().add(disponibilidad);
        
        mvc.perform(post("/api/cartografias").header("Accept", "application/json").content(serialize(cartografia)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated())
        .andDo(MockMvcResultHandlers.print());
 mvc.perform(get("/api/cartografias/1")
         .contentType(MediaType.APPLICATION_JSON))
         .andExpect(status().isOk())
         .andExpect(jsonPath("$.nombre", equalTo("Cartografia")));

        
/*        
        String dispo = "{\"cartografia\":{\"id\":1},\"territorio\":{\"id\":1}}";
        System.out.println(serialize(disponibilidad));
        mvc.perform(post("/api/disponibilidades-cartografias").header("Accept", "application/json").content(dispo).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated())
        .andDo(MockMvcResultHandlers.print());
         mvc.perform(get("/api/disponibilidades-cartografias")
         .contentType(MediaType.APPLICATION_JSON))
         .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
  */       
        
    }
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        
        ObjectMapper mapper = new ObjectMapper();
        //mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsBytes(object);
    }

}
