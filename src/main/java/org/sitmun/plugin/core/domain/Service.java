package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "stm_servicio")
public class Service {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
  @SequenceGenerator(name="stm_generator", sequenceName = "stm_seq")
  @Column(name = "ser_codigo")
  private long id;


  @Column(name = "ser_nombre", length = 30)
  private String name;

  @Column(name = "ser_url", length = 250)
  private String url;

  @Column(name = "ser_projects", length = 1000)
  private String projections;

  @Column(name = "ser_leyenda", length = 250)
  private String legend;
  
  @Column(name = "ser_tipo", length = 30)
  private String type;

  @Column(name = "ser_infourl", length = 250)
  private String infoUrl;


  @Column(name = "ser_f_alta")
  private Date createdDate;

  @OneToMany(mappedBy = "service",  orphanRemoval = true)
  private Set<Cartography> layers = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "ser_codcon",foreignKey=@ForeignKey(name = "STM_SER_FK_CON"))
  private Connection connection;
  
  
  @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<ServiceParameter> parameters = new HashSet<>();

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

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getProjections() {
    return projections;
  }

  public void setProjections(String projections) {
    this.projections = projections;
  }

  public String getLegend() {
    return legend;
  }

  public void setLegend(String legend) {
    this.legend = legend;
  }

  public String getInfoUrl() {
    return infoUrl;
  }

  public void setInfoUrl(String infoUrl) {
    this.infoUrl = infoUrl;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Set<Cartography> getLayers() {
    return layers;
  }

  public void setLayers(Set<Cartography> layers) {
    this.layers = layers;
  }

  public Connection getConnection() {
    return connection;
  }

  public void setConnection(Connection connection) {
    this.connection = connection;
  }

  public Set<ServiceParameter> getParameters() {
	return parameters;
  }

  public void setParameters(Set<ServiceParameter> parameters) {
	this.parameters = parameters;
  }

}