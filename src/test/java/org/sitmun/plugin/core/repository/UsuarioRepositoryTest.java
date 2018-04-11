
package org.sitmun.plugin.core.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.ConfiguracionUsuario;
import org.sitmun.plugin.core.domain.Rol;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;
      
    @Autowired
    private RolRepository rolRepository;
    
    @Autowired
    private ConfiguracionUsuarioRepository configuracionUsuarioRepository;
    
    @Autowired
    private CargoRepository cargoRepository;
    

    private Usuario usuario;

    @Before
    public void init() {
        usuario = new Usuario();
        usuario.setNombre("Admin");
        usuario.setApellido("AdminLastName");
        usuario.setAdministrador(true);
        usuario.setBloqueado(false);
        usuario.setPassword("prCTmrOYKHQ=");
        usuario.setUsername("admin");
        usuario.setCargos(null);
        usuario.setId(1);
        usuario.setPermisos(null);
        
        AplicacionRepositoryTest repoTest = new AplicacionRepositoryTest();
        
        Rol rol = new Rol();
        rol.setId(0);
        rol.setNombre("rol-admin");
        rol.setObservaciones("rol de administrador");
        rol.setAplicacion(repoTest.getAplication());
        
        TerritorioRepositoryTest terrTest = new TerritorioRepositoryTest();
                
        ConfiguracionUsuario confUsuario = new ConfiguracionUsuario();
        confUsuario.setId(1);
        confUsuario.setUsuario(usuario);
        confUsuario.setRol(rol);
        confUsuario.setTerritorio(terrTest.getTerritorio());

    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Usuario> persistentItems = usuarioRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        usuarioRepository.save(usuario);
        System.out.println(this.serialize(usuario));
        persistentItems = usuarioRepository.findAll();
        assertThat(persistentItems).hasSize(1);

    }

    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public Usuario getUsuario() {
    	return this.usuario;
    }

}
