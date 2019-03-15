package org.sitmun.plugin.core.domain;

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "STM_APPFON", uniqueConstraints = {@UniqueConstraint(name = "STM_APF_UK", columnNames = {"APF_CODAPP", "APF_CODFON"})})
public class ApplicationBackground implements Identifiable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "APF_CODIGO")
  private long id;

  @Column(name = "APF_ORDEN")
  private Integer order;

  @ManyToOne
  @JoinColumn(name = "APF_CODAPP", foreignKey = @ForeignKey(name = "STM_APF_FK_APP"))
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Application application;

  @ManyToOne
  @JoinColumn(name = "APF_CODFON", foreignKey = @ForeignKey(name = "STM_APF_FK_FON"))
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Background background;

  public Long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Application getApplication() {
    return application;
  }

  public void setApplication(Application application) {
    this.application = application;
  }

  public Background getBackground() {
    return background;
  }

  public void setBackground(Background background) {
    this.background = background;
  }

  public ResourceSupport toResource(RepositoryEntityLinks links) {
    Link selfLink = links.linkForSingleResource(this).withSelfRel();
    ResourceSupport res = new Resource<>(this, selfLink);
    res.add(links.linkForSingleResource(this).slash("application").withRel("application"));
    res.add(links.linkForSingleResource(this).slash("background").withRel("background"));
    return res;
  }

}