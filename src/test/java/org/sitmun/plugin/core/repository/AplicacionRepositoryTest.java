package org.sitmun.plugin.core.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Aplicacion;
import org.sitmun.plugin.core.domain.Fondo;
import org.sitmun.plugin.core.domain.FondoAplicacion;
import org.sitmun.plugin.core.domain.GrupoCartografia;
import org.sitmun.plugin.core.domain.ParametroAplicacion;
import org.sitmun.plugin.core.domain.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@RunWith(SpringRunner.class)
@DataJpaTest
public class AplicacionRepositoryTest {
    
    @Autowired
    private AplicacionRepository repository;
    
    @Autowired
    private GrupoCartografiaRepository grupoCartografiaRepository;
    
    @Autowired
    private FondoRepository fondoRepository;
    
    private Aplicacion item;

    @Before
    public void init() {
        item = new Aplicacion();
        item.setId(1);
        item.setNombre("Test");
        item.setFechaAlta(new Date());
        item.setArbol(null);
        item.setAutoRefrescoArbol(true);
        item.setEscalas(null);
        item.setMapaSituacion(null);
        item.setParametros(null);
        item.setProyecciones(null);        
        Rol rol = new Rol();
        rol.setNombre("Rol 1");
        item.getRolesDisponibles().add(rol);
        rol.setAplicacion(item);
        
        
        FondoAplicacion fondoAplicacion = new FondoAplicacion();
        fondoAplicacion.setAplicacion(item);
        Fondo fondo = new Fondo();
        fondo.setActivo(true);
        fondo.setDescripcion(null);fondo.setNombre("fondo");
        
        GrupoCartografia grupoCartografia;
        grupoCartografia = new GrupoCartografia();
        grupoCartografia.setNombre("Grupo cartografía");
        grupoCartografiaRepository.save(grupoCartografia);
        
        
        fondo.setGrupoCartografia(grupoCartografia);
        fondo.setFechaAlta(new Date());
        fondoAplicacion.setFondo(fondo );
        fondoAplicacion.setOrden(1);
        fondoRepository.save(fondo);
        
        
        item.getFondos().add(fondoAplicacion );
        
        ParametroAplicacion parametro = new ParametroAplicacion();
        parametro.setAplicacion(item);
        parametro.setNombre("param1");
        parametro.setTipo("tipo1");
        parametro.setTipo("valor1");
        
        item.setParametros(new HashSet<>());
        
        item.getParametros().add(parametro);
        
        item.setTema(null);
        item.setTipo(null);
        item.setTitulo("Test");
        
    }

    @Test
    public void addAndRemoveItem() throws JsonProcessingException {
        Iterable<Aplicacion> persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        repository.save(item);
        System.out.println(this.serialize(item));
        
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(1);
        item = persistentItems.iterator().next();
        assertThat(item.getRolesDisponibles().size() > 0);
        assertThat(item.getFondos().size() > 0);
        assertThat(item.getParametros().size() > 0);
        repository.delete(item);
        persistentItems = repository.findAll();
        assertThat(persistentItems).hasSize(0);
        
    }
    
    
    
    private byte[] serialize(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsBytes(object);
    }
    
    public Aplicacion getAplication () {
    	return this.item;
    }

}
