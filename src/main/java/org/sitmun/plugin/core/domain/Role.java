package org.sitmun.plugin.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_roles")
public class Role {
	
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "rol_codigo")
  private long id;

  @NotNull
  @Column(name = "rol_nombre", unique = true, nullable = false)
  private String name;

  @Column(name = "rol_observ")
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


}