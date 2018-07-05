package org.sitmun.plugin.core.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "stm_arbol")
public class Tree {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "arb_codigo")
  private long id;

  @Column(name = "arb_nombre")
  private String name;

  @OneToMany(mappedBy = "tree", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<TreeNode> nodes = new HashSet<>();

  /**
   * @return the id
   */
  public long getId() {
    return id;
  }


  /**
   * @param id the id to set
   */
  public void setId(long id) {
    this.id = id;
  }


  public String getName() {
    return name;
  }


  public void setName(String name) {
    this.name = name;
  }


  public Set<TreeNode> getNodes() {
    return nodes;
  }


  public void setNodes(Set<TreeNode> nodes) {
    this.nodes = nodes;
  }


}