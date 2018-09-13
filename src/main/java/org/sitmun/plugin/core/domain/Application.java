package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.HashSet;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "stm_apps")
public class Application {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "app_codigo")
  private long id;

  @Column(name = "app_nombre")
  private String name;

  @Column(name = "app_tipo")
  private String type;

  @Column(name = "app_titulo")
  private String title;

  @Column(name = "app_tema")
  private String theme;

  @Column(name = "app_f_alta")
  private Date createdDate;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "stm_approl", joinColumns = @JoinColumn(name = "apr_codrol"), inverseJoinColumns = @JoinColumn(name = "apr_codapp"))
  private Set<Role> availableRoles = new HashSet<>();

  @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<ApplicationParameter> parameters = new HashSet<>();

  @ManyToMany
  @JoinTable(name = "stm_apparb", joinColumns = @JoinColumn(name = "apa_codarb"), inverseJoinColumns = @JoinColumn(name = "apa_codapp"))
  private Set<Tree> trees;
  //comma-separated values
  @Column(name = "app_escalas")
  private String scales;
  //comma-separated EPSG codes
  @Column(name = "app_project")
  private String projections;
  @Column(name = "app_autorefr")
  private Boolean treeAutoRefresh;
  @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<ApplicationBackground> backgrounds = new HashSet<>();
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "cod_gca")
  private CartographyGroup situationMap;

 
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

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getTheme() {
    return theme;
  }

  public void setTheme(String theme) {
    this.theme = theme;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Set<Role> getAvailableRoles() {
    return availableRoles;
  }

  public void setAvailableRoles(Set<Role> availableRoles) {
    this.availableRoles = availableRoles;
  }

  public Set<ApplicationParameter> getParameters() {
    return parameters;
  }

  public void setParameters(Set<ApplicationParameter> parameters) {
    this.parameters = parameters;
  }

  public Set<Tree> getTrees() {
    return trees;
  }

  public void setTrees(Set<Tree> trees) {
    this.trees = trees;
  }

  public String getScales() {
    return scales;
  }

  public void setScales(String scales) {
    this.scales = scales;
  }

  public String getProjections() {
    return projections;
  }

  public void setProjections(String projections) {
    this.projections = projections;
  }

  public Boolean getTreeAutoRefresh() {
    return treeAutoRefresh;
  }

  public void setTreeAutoRefresh(Boolean treeAutoRefresh) {
    this.treeAutoRefresh = treeAutoRefresh;
  }

  public Set<ApplicationBackground> getBackgrounds() {
    return backgrounds;
  }

  public void setBackgrounds(Set<ApplicationBackground> backgrounds) {
    this.backgrounds = backgrounds;
  }

  public CartographyGroup getSituationMap() {
    return situationMap;
  }

  public void setSituationMap(CartographyGroup situationMap) {
    this.situationMap = situationMap;
  }


}