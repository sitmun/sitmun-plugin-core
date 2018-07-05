package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_cargo")
public class UserPosition {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "cgo_codigo")
  private long id;

  @Column(name = "cgo_cargo")
  private String name;

  @Column(name = "cgo_org")
  private String organization;

  @Column(name = "cgo_correo")
  private String email;

  @Column(name = "cgo_f_alta")
  private Date createdDate;

  @Column(name = "cgo_f_caduc")
  private Date datedDate;

  @ManyToOne
  @JoinColumn(name = "cgo_codusu")
  @NotNull
  private User user;

  @ManyToOne
  @JoinColumn(name = "cgo_codter")
  @NotNull
  private Territory territory;

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

  public String getOrganization() {
    return organization;
  }

  public void setOrganization(String organization) {
    this.organization = organization;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Date getDatedDate() {
    return datedDate;
  }

  public void setDatedDate(Date datedDate) {
    this.datedDate = datedDate;
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


}