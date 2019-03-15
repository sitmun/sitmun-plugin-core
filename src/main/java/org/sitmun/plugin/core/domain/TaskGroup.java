package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name = "STM_GRPTAR")
public class TaskGroup {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "GTA_CODIGO")
  private long id;

  @Column(name = "GTA_NOMBRE", length = 80)
  private String name;

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
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