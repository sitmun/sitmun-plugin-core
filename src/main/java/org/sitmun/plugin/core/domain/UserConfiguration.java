package org.sitmun.plugin.core.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "STM_USUCONF", uniqueConstraints = {@UniqueConstraint(name = "STM_UCF_UK", columnNames = {"UCF_CODUSU", "UCF_CODTER", "UCF_CODROL"})})
public class UserConfiguration {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "UCF_CODIGO", precision = 11)
  private BigInteger id;

  @JoinColumn(name = "UCF_CODUSU", foreignKey = @ForeignKey(name = "STM_UCF_FK_USU"))
  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @ManyToOne
  // @MapsId("territorioId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "UCF_CODTER", foreignKey = @ForeignKey(name = "STM_UCF_FK_TER"))
  private Territory territory;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  // @MapsId("rolId")
  @JoinColumn(name = "UCF_CODROL", foreignKey = @ForeignKey(name = "STM_UCF_FK_ROL"))
  private Role role;

  public BigInteger getId() {
    return id;
  }

  public void setId(BigInteger id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Territory getTerritory() {
    return territory;
  }

  public void setTerritory(Territory territory) {
    this.territory = territory;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

}