package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "STM_TAREA_UI")
public class TaskUI {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "TUI_CODIGO", precision = 11)
  private BigInteger id;

  @Column(name = "TUI_NOMBRE", length = 30)
  private String name;

  @Column(name = "TUI_TOOLTIP", length = 100)
  private String tooltip;

  @Column(name = "TUI_ORDEN")
  private Integer order;

  @Column(name = "TUI_TIPO", length = 30)
  private String type;


  public String getTooltip() {
    return tooltip;
  }

  public void setTooltip(String tooltip) {
    this.tooltip = tooltip;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }


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