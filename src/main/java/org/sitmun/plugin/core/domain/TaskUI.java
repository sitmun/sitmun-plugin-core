package org.sitmun.plugin.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stm_tarea_ui")
public class TaskUI {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "tui_codigo")
  private long id;

  @Column(name = "tui_nombre")
  private String name;

  @Column(name = "tui_tooltip")
  private String tooltip;

  @Column(name = "tui_orden")
  private Integer order;
  
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

@Column(name = "tui_tipo")
  private String type;


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