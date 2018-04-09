package org.sitmun.plugin.core.web.rest;

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
        usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Admin");
        usuario.setApellido("Admin");
        usuario.setAdministrador(true);
        usuario.setBloqueado(false);
        usuario.setPassword("prCTmrOYKHQ=");
        usuario.setUsername("admin");
        
        territorio = new Territorio();
        territorio.setId(1);
        territorio.setNombre("Territorio");
        
        mvc.perform(post("/api/territorios").header("Accept", "application/json")
                .content(serialize(territorio))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());
        
        
        territorio2 = new Territorio();
        territorio2.setId(2);
        territorio2.setNombre("Territorio 2");

        mvc.perform(post("/api/territorios").header("Accept", "application/json")
                .content(serialize(territorio2))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());
        
        aplicacion = new Aplicacion();
        aplicacion.setNombre("Aplicación 1");
        aplicacion.setId(1);
        
        mvc.perform(post("/api/aplicaciones").header("Accept", "application/json")
                .content(serialize(aplicacion))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());

        
        
        rol = "{\"id\":1,\"nombre\":\"Administrador Aplicación 1\",\"aplicacion\":\"http://localhost:"
                +  port+"/aplicaciones/1\"}";
        
        
        mvc.perform(post("/api/roles").header("Accept", "application/json")
                .content(rol)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());

        
        rol2 =
        "{\"id\":2,\"nombre\":\"Usuario Aplicación 1\",\"aplicacion\":\"http://localhost:"
                +port+"/aplicaciones/1\"}";
        
        mvc.perform(post("/api/roles").header("Accept", "application/json")
                .content(rol2)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());
        
        
        permiso = "{\"rol\":\"http://localhost:"+port+"/roles/1\""+
                 ",\"usuario\":\"http://localhost:"+port+"/usuarios/1\","+
                "\"territorio\":\"http://localhost:"+port+"/territorios/1\"}";

/*        
        cargo = new Cargo();
        cargo.setCorreo("director@organizacion1.org");
        cargo.setFechaAlta(new Date());
        cargo.setOrganizacion("Organizacion 1");
        cargo.setTerritorio(territorio);
        cargo.setUsuario(usuario);
        
        
        
        permiso2 = new ConfiguracionUsuario();
        permiso2.setRol(rol2);
        permiso2.setTerritorio(territorio);
        permiso2.setUsuario(usuario);
  */      
        cargo = "{\"usuario\":\"http://localhost:"+port+"/usuarios/1\","+
                "\"nombre\":\"Director\","+
                "\"organizacion\":\"Organizacion 1\","+
                "\"correo\":\"director@organizacion1.org\","+
               "\"territorio\":\"http://localhost:"+port+"/territorios/1\"}";

        
        permiso2 = "{\"rol\":\"http://localhost:"+port+"/roles/2\""+
                ",\"usuario\":\"http://localhost:"+port+"/usuarios/1\","+
               "\"territorio\":\"http://localhost:"+port+"/territorios/1\"}";
    }

    @Test
    public void test1_addUsuario() throws Exception {


        /*
         * Alta de usuario
         */
        mvc.perform(post("/api/usuarios").header("Accept", "application/json")
                .content(serialize(usuario))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());
        mvc.perform(
                get("/api/usuarios/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", equalTo("admin")));
    }

    /**
     * Permisos En la pestaña Permisos se definen los roles del usuario
     * para un territorio particular. Esta acción se realiza en dos pasos. El
     * primero paso es escoger un territorio y el segundo asignar los roles para
     * este usuario y territorio.
     * 
     * @throws Exception
     */
    @Test
    public void test2_addPermisosToUsuario() throws Exception {
        mvc.perform(post("/api/configuraciones-usuarios").header("Accept", "application/json")
                .content(this.permiso)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());

    }


    /**
     * Datos asociados al territorio En esta pestaña se pueden definir los
     * siguientes campos: • Cargo • Organización • Correo • Caducidad Además el
     * sistema nos muestra el territorio y la fecha de asignación, que se
     * informan automáticamente
     * 
     * @throws Exception
     */
    @Test
    public void test3_addCargoToUsuario() throws Exception {
        mvc.perform(post("/api/cargos").header("Accept", "application/json")
                .content(this.cargo)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());

    }
    
   
    
    /**
     *  Edición de usuarios
    La aplicación permite modificar todos los campos de los usuarios.
    Para realizar una modificación hay que seleccionar el usuario de la lista y pulsar el botón
    o hacer doble-clic en el registro del usuario a editar.
    Para guardar los cambios realizados en esta pestaña hay que pulsar el botón “Guardar”.
    
     * @throws Exception
     */
    @Test
    public void test4_updateUsuario() throws Exception {
        usuario.setApellido("Test");
        mvc.perform(put("/api/usuarios/1").header("Accept", "application/json")
                .content(serialize(usuario))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
        mvc.perform(
                get("/api/usuarios/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.apellido", equalTo("Test")));

    }
    
    
    /**
    Para modificar los permisos de un usuario hay que ir a la pestaña Permisos dónde encontraremos las
    siguientes opciones:
    */
    
    /**
     * Añadir permisos
     * @throws Exception
     */
    @Test
    public void test5_addPermisoUsuario() throws Exception {
        //ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mvc.perform(post("/api/configuraciones-usuarios").header("Accept", "application/json")
                .content(this.permiso2)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print()).andReturn();
    }
    
    /**
     * Borrar permisos
     * @throws Exception
     */
    @Test
    public void test7_deletePermisoUsuario() throws Exception {
        
        final Resources<Resource<ConfiguracionUsuario>> permisos = new Traverson(new URI("http://localhost:"+port+"/api/usuarios/1"), MediaTypes.HAL_JSON).follow("permisos").toObject(new TypeReferences.ResourcesType<Resource<ConfiguracionUsuario>>(){});
        Collection<Resource<ConfiguracionUsuario>> links = permisos.getContent();        
        for (Resource<ConfiguracionUsuario> link:links) {
            if (link.getId().getHref().replace("http://localhost:"+port, "").contains("2")){
            
               
                mvc.perform(delete(link.getId().getHref().replace("http://localhost:"+port, "")).header("Accept", "application/json")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().is2xxSuccessful())
                        .andDo(MockMvcResultHandlers.print());
                
                mvc.perform(get(link.getId().getHref().replace("http://localhost:"+port, "")).header("Accept", "application/json")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isNotFound())
                        .andDo(MockMvcResultHandlers.print());
            
            }
        }
    }
    
    /**
     * Editar permisos
     * @throws Exception
     */
    @Test
    public void test6_updatePermisoUsuario() throws Exception {
        //Obtener los permisos asociados al usuario
        //Cojo el permiso asociado al rol2 y le modifico el territorio
        //en la respuesta busco que se haya actualizado el territorio
        
        final Resources<Resource<ConfiguracionUsuario>> permisos = new Traverson(new URI("http://localhost:"+port+"/api/usuarios/1"), MediaTypes.HAL_JSON).follow("permisos").toObject(new TypeReferences.ResourcesType<Resource<ConfiguracionUsuario>>(){});
        System.out.println("Tiene permisos :"+permisos.getContent().size());
        Collection<Resource<ConfiguracionUsuario>> links = permisos.getContent();        
        for (Resource<ConfiguracionUsuario> link:links) {
            System.out.println("link "+link.getId().getHref().replace("http://localhost:"+port, ""));
            if (link.getId().getHref().replace("http://localhost:"+port, "").contains("2")){
            
                permiso2 = "{\"rol\":\"http://localhost:"+port+"/roles/2\""+
                        ",\"usuario\":\"http://localhost:"+port+"/usuarios/1\","+
                       "\"territorio\":\"http://localhost:"+port+"/territorios/2\"}";
                //System.out.println(this.permiso2);
                mvc.perform(put(link.getId().getHref().replace("http://localhost:"+port, "")+"/territorio").header("Accept", "application/json")
                    .content("http://localhost:"+port+"/territorios/2")
                    //.content(permiso2)
                    .contentType("text/uri-list"))
                    //.contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is2xxSuccessful())
                    .andDo(MockMvcResultHandlers.print()).andReturn();
            }
            /*
            mvc.perform(
                    get("/api/configuraciones-usuarios/2/territorio").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nombre", equalTo("Territorio 2")))
                    .andDo(MockMvcResultHandlers.print()).andReturn();
                    */
            
        }

    }
    
    /**
     * También es posible modificar los datos asociados a un territorio. Para ello iremos a la pestaña Datos
        asociados al territorio y pincharemos directamente sobre el campo a editar. El nombre del territorio y la
        fecha de alta no se pueden editar.
     * @throws Exception
     */
    @Test
    public void test8_updateCargoUsuario() throws Exception {
        //Obtener los cargos asociados al usuario
        //Cojo un cargo y le modifico el nombre del cargo
        //en la respuesta busco que se haya actualizado
        final Resources<Resource<ConfiguracionUsuario>> cargos = new Traverson(new URI("http://localhost:"+port+"/api/usuarios/1"), MediaTypes.HAL_JSON).follow("cargos").toObject(new TypeReferences.ResourcesType<Resource<ConfiguracionUsuario>>(){});
        Collection<Resource<ConfiguracionUsuario>> links = cargos.getContent();        
        for (Resource<ConfiguracionUsuario> link:links) {
            if (link.getId().getHref().replace("http://localhost:"+port, "").contains("1")){
                cargo = "{\"usuario\":\"http://localhost:"+port+"/usuarios/1\","+
                        "\"nombre\":\"Gestor\","+
                        "\"organizacion\":\"Organizacion 1\","+
                        "\"correo\":\"director@organizacion1.org\","+
                       "\"territorio\":\"http://localhost:"+port+"/territorios/1\"}";
            
            mvc.perform(put(link.getId().getHref().replace("http://localhost:"+port, "")).header("Accept", "application/json")
                    .content(this.cargo)
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is2xxSuccessful())
                    .andDo(MockMvcResultHandlers.print()).andReturn();
            }
            
            mvc.perform(
                    get("/api/cargos/1").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk()).andExpect(jsonPath("$.nombre", equalTo("Gestor")))

                    .andDo(MockMvcResultHandlers.print()).andReturn();
            
        }
    }
    
    
    
    /**
     *Baja de usuario 
     * @throws Exception
     */
    @Test
    public void test9_deleteUsuario() throws Exception {
        mvc.perform(delete("/api/usuarios/1").header("Accept", "application/json")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
        
        mvc.perform(get("/api/usuarios/1").header("Accept", "application/json")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());


    }
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
//        System.out.println(new String(mapper.writeValueAsBytes(object)));
        return mapper.writeValueAsBytes(object);
    }


}
