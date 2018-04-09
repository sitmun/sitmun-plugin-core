
package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

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

}
