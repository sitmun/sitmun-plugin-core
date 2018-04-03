package org.sitmun.plugin.core.web.rest;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Usuario;
import org.sitmun.plugin.core.repository.TerritorioRepository;
import org.sitmun.plugin.core.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UsuarioRestResourceIntTest {
    
    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    
    @Autowired
    private TerritorioRepository territorioRepository;

 
    // write test cases here
    //(1,'admin','prCTmrOYKHQ=','Admin','Admin',1,0);
    //(2,'public','prCTmrOYKHQ=','','',0,0);
    private Usuario usuario;
    
    @Before
    public void init() {
        usuario = new Usuario();
        usuario.setNombre("Admin");
        usuario.setApellido("Admin");
        usuario.setAdministrador(true);
        usuario.setBloqueado(false);
        usuario.setPassword("prCTmrOYKHQ=");
        usuario.setUsername("admin");
        
        //usuario.setPermisos(permisos);
        
    }


    @Test
    public void addUsuario() throws Exception{
        
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
       mvc.perform(post("/api/usuarios").header("Accept", "application/json").content(serialize(usuario)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated())
               .andDo(MockMvcResultHandlers.print());
        mvc.perform(get("/api/usuarios/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", equalTo("admin")));
    }
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        
        ObjectMapper mapper = new ObjectMapper();
        //mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsBytes(object);
    }

}
