package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "STM_ARBOLNOD")
public class TreeNode {

  // Códigos numéricos
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "ANR_CODIGO", precision = 11)
  private BigInteger id;

  @Column(name = "ARN_NOMBRE", length = 80)
  private String name;

  @Column(name = "ARN_TOOLTIP", length = 100)
  private String tooltip;

  @Column(name = "ARN_ORDEN")
  private Integer ordee;

  @Column(name = "ARN_ACTIVO")
  private Boolean active;

  @JoinColumn(name = "ARN_CODPADRE", foreignKey = @ForeignKey(name = "STM_ARN_FK_ARN"))
  @ManyToOne
  @JsonIgnore
  private TreeNode parent;

  @JoinColumn(name = "ARN_CODARB", foreignKey = @ForeignKey(name = "STM_ARN_FK_ARB"))
  @ManyToOne
  private Tree tree;

  @JoinColumn(name = "ARN_CODCAR", foreignKey = @ForeignKey(name = "STM_ARN_FK_CAR"))
  @ManyToOne
  private Cartography cartography;

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

  public String getTooltip() {
    return tooltip;
  }

  public void setTooltip(String tooltip) {
    this.tooltip = tooltip;
  }

  public Integer getOrdee() {
    return ordee;
  }

  public void setOrdee(Integer ordee) {
    this.ordee = ordee;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public TreeNode getParent() {
    return parent;
  }

  public void setParent(TreeNode parent) {
    this.parent = parent;
  }

  public Tree getTree() {
    return tree;
  }

  public void setTree(Tree tree) {
    this.tree = tree;
  }

  public Cartography getCartography() {
    return cartography;
  }

  public void setCartography(Cartography cartography) {
    this.cartography = cartography;
  }

}