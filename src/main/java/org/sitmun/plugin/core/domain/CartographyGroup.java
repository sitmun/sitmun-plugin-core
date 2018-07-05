package org.sitmun.plugin.core.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "stm_grpcarto")
public class CartographyGroup {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "gca_codigo")
  private long id;

  @Column(name = "gca_nombre")
  private String name;

  @Column(name = "gca_tipo")
  private String type;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "stm_gcacar", joinColumns = @JoinColumn(name = "gcc_codcar"), inverseJoinColumns = @JoinColumn(name = "gcc_codgca"))
  private Set<Cartography> members;


  //roles para los que estará disponible este grupo de cartografía se gestiona desde aquí
  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "stm_rolgca", joinColumns = @JoinColumn(name = "rgc_codrol"), inverseJoinColumns = @JoinColumn(name = "rgc_codgca"))
  private Set<Role> roles;


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


  public String getType() {
    return type;
  }


  public void setType(String type) {
    this.type = type;
  }


  public Set<Cartography> getMembers() {
    return members;
  }


  public void setMembers(Set<Cartography> members) {
    this.members = members;
  }


  public Set<Role> getRoles() {
    return roles;
  }


  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }


}