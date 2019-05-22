package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Entity
@Table(name = "STM_TIPOGRP", uniqueConstraints = {@UniqueConstraint(name = "STM_TGR_NOM_UK", columnNames = {"TGR_NOMBRE"})})
public class TerritoryType {

  @TableGenerator(
    name = "STM_TIPOGRP_GEN",
    table = "STM_CODIGOS",
    pkColumnName = "GEN_CODIGO",
    valueColumnName = "GEN_VALOR",
    pkColumnValue = "TGR_CODIGO",
    allocationSize = 1)
  @Id
  @GeneratedValue(strategy = GenerationType.TABLE, generator = "STM_TIPOGRP_GEN")
  @Column(name = "TGR_CODIGO", precision = 11)
  private BigInteger id;

  @NotNull
  @Column(name = "TGR_NOMBRE", nullable = false, length = 250)
  private String name;

  public BigInteger getId() {
    return id;
  }

  public void setId(BigInteger id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
