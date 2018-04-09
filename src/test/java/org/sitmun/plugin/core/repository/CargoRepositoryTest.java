package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Cargo;
import org.sitmun.plugin.core.domain.Territorio;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@RunWith(SpringRunner.class)
@DataJpaTest
public class CargoRepositoryTest {
    
    @Autowired
    private CargoRepository cargoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private TerritorioRepository territorioRepository;
 
    private Cargo cargo;

    private Territorio territorio;

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
        usuario.setCargos(null);
        usuario.setId(1);
        usuario.setPermisos(null);
        usuarioRepository.save(usuario);

        territorio = new Territorio();
        territorio.setId(1);
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
        territorioRepository.save(territorio);

        
        cargo = new Cargo();
        cargo.setId(1);
        cargo.setNombre("Test");
        cargo.setCorreo(null);
        cargo.setFechaAlta(new Date());
        cargo.setFechaCaducidad(null);
        cargo.setOrganizacion("Test");
        cargo.setTerritorio(territorio);
        cargo.setUsuario(usuario);
        
    }

    @Test
    public void addItem() throws JsonProcessingException {
        Iterable<Cargo> persistentItems = cargoRepository.findAll();
        assertThat(persistentItems).hasSize(0);
        cargoRepository.save(cargo);
        System.out.println(this.serialize(cargo));
        persistentItems = cargoRepository.findAll();
        assertThat(persistentItems).hasSize(1);                
        
    }
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }

}
