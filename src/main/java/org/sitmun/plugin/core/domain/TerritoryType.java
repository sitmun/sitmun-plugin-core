package org.sitmun.plugin.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_tipogrp")
public class TerritoryType {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "tgr_codigo")
  private long id;
  
  @NotNull
  @Column(name = "tgr_nombre", unique = true, nullable = false)
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