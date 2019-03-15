package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Table(name = "STM_DISPTAREA", uniqueConstraints = {@UniqueConstraint(name = "STM_DTA_UK", columnNames = {"DTA_CODTER", "DTA_CODTAR"})})
public class TaskAvailability {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "DTA_CODIGO", precision = 11)
  private BigInteger id;

  @Column(name = "DTA_F_ALTA")
  private Date createdDate;
  @ManyToOne
  @JoinColumn(name = "DTA_CODTER", foreignKey = @ForeignKey(name = "STM_DTA_FK_TER"))
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Territory territory;
  @ManyToOne
  @JoinColumn(name = "DTA_CODTAR", foreignKey = @ForeignKey(name = "STM_DTA_FK_TAR"))
  // @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Task task;

  public BigInteger getId() {
    return id;
  }

  public void setId(BigInteger id) {
    this.id = id;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Territory getTerritory() {
    return territory;
  }

  public void setTerritory(Territory territory) {
    this.territory = territory;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }

}