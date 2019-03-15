package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "STM_TIPOGRP", uniqueConstraints = {@UniqueConstraint(name = "STM_TGR_NOM_UK", columnNames = {"TGR_NOMBRE"})})
public class TerritoryType {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "TGR_CODIGO")
  private long id;

  @NotNull
  @Column(name = "TGR_NOMBRE", nullable = false, length = 250)
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