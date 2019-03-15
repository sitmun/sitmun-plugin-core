package org.sitmun.plugin.core.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "STM_DISPCARTO", uniqueConstraints = {@UniqueConstraint(columnNames = {"DCA_CODTER", "DCA_CODCAR"})})
public class CartographyAvailability {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "DCA_CODIGO")
  private long id;

  @Column(name = "DCA_F_ALTA")
  private Date createdDate;

  @ManyToOne
  // @MapsId("territorioId")
  @JoinColumn(name = "DCA_CODTER", foreignKey = @ForeignKey(name = "STM_DCA_FK_TER"))
  @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Territory territory;

  @ManyToOne
  // @MapsId("cartografiaId")
  @JoinColumn(name = "DCA_CODCAR", foreignKey = @ForeignKey(name = "STM_DCA_FK_CAR"))
  @OnDelete(action = OnDeleteAction.CASCADE)
  @NotNull
  private Cartography cartography;

  public long getId() {
    return id;
  }

  public void setId(long id) {
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

  public Cartography getCartography() {
    return cartography;
  }

  public void setCartography(Cartography cartography) {
    this.cartography = cartography;
  }

  public String toString() {
    return "Cartography=" + this.cartography.getId() + ",Territorio=" + this.territory.getId() + "fechaAlta="
      + this.createdDate;
  }

}