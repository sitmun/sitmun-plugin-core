package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "STM_PARAMSER")
public class ServiceParameter {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "PSE_CODIGO")
  private long id;

  @Column(name = "PSE_NOMBRE", length = 30)
  private String name;

  @Column(name = "PSE_VALOR", length = 250)
  private String value;

  @Column(name = "PSE_TIPO", length = 250)
  private String type;

  @ManyToOne
  @NotNull
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "PSE_CODSER", foreignKey = @ForeignKey(name = "STM_PSE_FK_SER"))
  private Service service;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Service getService() {
    return service;
  }

  public void setService(Service service) {
    this.service = service;
  }

}