package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name = "STM_TIPOTAREA")
public class TaskType {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "TTA_CODIGO")
  private long id;

  @Column(name = "TTA_NOMBRE", length = 30)
  private String name;

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

}