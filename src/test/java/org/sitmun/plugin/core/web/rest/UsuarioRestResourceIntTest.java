package org.sitmun.plugin.core.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.net.URI;
import java.util.Collection;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.sitmun.plugin.core.domain.Aplicacion;
import org.sitmun.plugin.core.domain.Cargo;
import org.sitmun.plugin.core.domain.ConfiguracionUsuario;
import org.sitmun.plugin.core.domain.Territorio;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.client.Traverson;
import org.springframework.hateoas.mvc.TypeReferences;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


/*
 * 4.3.1 Gestión de Usuarios
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UsuarioRestResourceIntTest {

    @Autowired
    private MockMvc mvc;
    
   
   
/*
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TerritorioRepository territorioRepository;
*/
    private Usuario usuario;

    private Territorio territorio;

    private String rol;
    
    private String rol2;

    private Aplicacion aplicacion;
    
    private String cargo;

    private String permiso;
    
    private String permiso2;

    private Territorio territorio2;

    
    @Value("${local.server.port}")
    private int port;

    @Before
    public void init() throws JsonProcessingException, Exception {
        
    }

    @Test
    public void test() throws Exception {
        assertThat(true);   
    }

    
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
//        System.out.println(new String(mapper.writeValueAsBytes(object)));
        return mapper.writeValueAsBytes(object);
    }


}
