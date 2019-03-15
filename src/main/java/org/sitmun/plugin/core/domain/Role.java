package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "STM_ROLES")
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "ROL_CODIGO")
  private long id;

  @NotNull
  @Column(name = "ROL_NOMBRE", unique = true, nullable = false, length = 250)
  private String name;

  @Column(name = "ROL_OBSERV", length = 500)
  private String comments;

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

  public String getComments() {
    return comments;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  @Override
  public boolean equals(Object o) {
    if ((o != null) && (o instanceof Role)) {
      return ((Role) o).getId() == this.getId();
    }
    return false;
  }

  @Override
  public int hashCode() {
    return super.hashCode();
  }

}