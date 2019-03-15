package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name = "STM_CONEXION")
public class Connection {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "CON_CODIGO")
  private long id;

  @Column(name = "CON_NOMBRE", length = 80)
  private String name;

  @Column(name = "CON_DRIVER", length = 50)
  private String type;

  @Column(name = "CON_USUARIO", length = 50)
  private String user;

  @Column(name = "CON_PASSWORD", length = 50)
  private String password;

  @Column(name = "CON_CONSTRING", length = 250)
  private String connectionString;

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

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getConnectionString() {
    return connectionString;
  }

  public void setConnectionString(String connectionString) {
    this.connectionString = connectionString;
  }

}