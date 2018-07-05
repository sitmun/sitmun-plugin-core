package org.sitmun.plugin.core.repository;

import org.assertj.core.api.SoftAssertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Application;
import org.sitmun.plugin.core.domain.ApplicationBackground;
import org.sitmun.plugin.core.domain.ApplicationParameter;
import org.sitmun.plugin.core.domain.Background;
import org.sitmun.plugin.core.domain.CartographyGroup;
import org.sitmun.plugin.core.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assumptions.assumeThat;


@RunWith(SpringRunner.class)
@DataJpaTest
public class ApplicationRepositoryTest {

  @Autowired
  private AplicacionRepository applicationRepository;

  @Autowired
  private CartographyGroupRepository cartographyGroupRepository;

  @Autowired
  private BackgroundRepository backgroundRepository;

  private Application application;


  @Before
  public void init() {

    application = new Application();
    application.setName("Test");
    application.setCreatedDate(new Date());
    application.setTrees(null);
    application.setTreeAutoRefresh(true);
    application.setScales(null);
    application.setSituationMap(null);
    application.setParameters(null);
    application.setProjections(null);
    application.setParameters(new HashSet<>());
    application.setTheme(null);
    application.setType(null);
    application.setTitle("Test");

    Role rol = new Role();
    rol.setName("Rol 1");
    application.getAvailableRoles().add(rol);

    CartographyGroup cartographyGroup;
    cartographyGroup = new CartographyGroup();
    cartographyGroup.setName("Grupo cartografía");
    cartographyGroupRepository.save(cartographyGroup);

    Background background = new Background();
    background.setActive(true);
    background.setDescription(null);
    background.setName("fondo");
    background.setCartographyGroup(cartographyGroup);
    background.setCreatedDate(new Date());
    backgroundRepository.save(background);

    ApplicationBackground applicationBackground = new ApplicationBackground();
    applicationBackground.setApplication(application);
    applicationBackground.setBackground(background);
    applicationBackground.setOrder(1);
    application.getBackgrounds().add(applicationBackground);

    ApplicationParameter parameter = new ApplicationParameter();
    parameter.setApplication(application);
    parameter.setName("param1");
    parameter.setType("tipo1");
    parameter.setValue("valor1");
    application.getParameters().add(parameter);
  }

  @Test
  public void saveApplication() {
    assumeThat(applicationRepository.findOne(application.getId())).isNull();
    applicationRepository.save(application);
    assertThat(application.getId()).isNotZero();
  }

  @Test
  public void findOneApplicationById() {
    assumeThat(applicationRepository.findOne(application.getId())).isNull();
    applicationRepository.save(application);
    assumeThat(application.getId()).isNotZero();

    application = applicationRepository.findOne(application.getId());
    SoftAssertions softly = new SoftAssertions();
    softly.assertThat(application.getAvailableRoles()).isNotEmpty();
    softly.assertThat(application.getBackgrounds()).isNotEmpty();
    softly.assertThat(application.getParameters()).isNotEmpty();
    softly.assertAll();
  }

  @Test
  public void deleteApplicationById() {
    assumeThat(applicationRepository.findOne(application.getId())).isNull();
    applicationRepository.save(application);
    assumeThat(application.getId()).isNotZero();

    Long id = application.getId();
    applicationRepository.delete(application);
    assertThat(applicationRepository.findOne(id)).isNull();
  }
}
