package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Entity
@Table(name = "STM_PARAMTTA")
public class TaskParameter {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "PTT_CODIGO", precision = 11)
  private BigInteger id;

  @Column(name = "PTT_NOMBRE", length = 50)
  private String name;

  @Column(name = "PTT_VALOR", length = 512)
  private String value;

  @Column(name = "PTT_TIPO", length = 30)
  private String type;

  @ManyToOne
  @NotNull
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "PTT_CODTAR", foreignKey = @ForeignKey(name = "STM_PTT_FK_TAR"))
  private Task task;

  @Column(name = "PTT_ORDEN")
  private Integer order;

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

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

}