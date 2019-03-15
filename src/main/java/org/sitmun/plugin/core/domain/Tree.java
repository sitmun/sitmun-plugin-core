package org.sitmun.plugin.core.domain;

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "STM_ARBOL")
public class Tree implements Identifiable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "ARB_CODIGO")
  private long id;

  @Column(name = "ARB_NOMBRE", length = 100)
  private String name;

  @OneToMany(mappedBy = "tree", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private Set<TreeNode> nodes = new HashSet<>();

  @ManyToMany
  @JoinTable(name = "STM_ARBROL", joinColumns = @JoinColumn(name = "ARR_CODARB", foreignKey = @ForeignKey(name = "STM_ARR_FK_ARB")), inverseJoinColumns = @JoinColumn(name = "arr_codrol", foreignKey = @ForeignKey(name = "STM_ARR_FK_ROL")))
  private Set<Role> availableRoles = new HashSet<>();

  public Set<Role> getAvailableRoles() {
    return availableRoles;
  }

  public void setAvailableRoles(Set<Role> availableRoles) {
    this.availableRoles = availableRoles;
  }

  /**
   * @return the id
   */
  public Long getId() {
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

  public ResourceSupport toResource(RepositoryEntityLinks links) {
    Link selfLink = links.linkForSingleResource(this).withSelfRel();
    ResourceSupport res = new Resource<>(this, selfLink);
    res.add(links.linkForSingleResource(this).slash("availableRoles").withRel("availableRoles"));
    res.add(links.linkForSingleResource(this).slash("nodes").withRel("nodes"));
    return res;
  }

}