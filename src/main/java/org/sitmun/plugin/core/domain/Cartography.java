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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "stm_carto")
public class Cartography {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "car_codigo")
  private long id;

  @Column(name = "car_nombre")
  private String name;

  @Column(name = "car_tipo")
  private String type;

  @Column(name = "car_visible")
  private Boolean visible;

  @Column(name = "car_transp")
  private Integer transparency;

  @Column(name = "car_queryabl")
  private Boolean queryable;

  @Column(name = "car_queryact")
  private Boolean queryAct;

  @Column(name = "car_querylay")
  private Boolean queryLay;

  @Column(name = "car_f_alta")
  private Date createdDate;

  @Column(name = "car_orden")
  private Integer order;

  @Column(name = "car_esc_min")
  private Integer minimumScale;

  @Column(name = "car_esc_max")
  private Integer maximumScale;

  //Nombre de las capa
  @Column(name = "car_capas")
  private String layers;

  @ManyToOne
  @JoinColumn(name = "car_codser")
  private Service service;

  @ManyToOne
  @JoinColumn(name = "car_codcon")
  private Connection connection;

  @OneToMany(mappedBy = "cartography", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<CartographyAvailability> availabilities = new HashSet<>();

  //CAR_SELECTABL
  @Column(name = "car_selectable")
  private Boolean selectable;

  //CAR_SELECTLAY
  @Column(name = "car_seleclay")
  private String selectionLayer;

  //CAR_CODSERSEL
  @ManyToOne
  @JoinColumn(name = "car_codsersel")
  private Service selectionService;

  //CAR_LEYENDTIP
  @Column(name = "car_leyendtip")
  private String legendTip;

  //CAR_LEYENDURL
  @Column(name = "car_leyendurl")
  private String legendUrl;

  //CAR_EDITABLE
  @Column(name = "car_editable")
  private Boolean editable;

  //CAR_METAURL
  @Column(name = "car_metaurl")
  private String metadataUrl;

  //CAR_TEMATIZABLE
  @Column(name = "car_tematizable")
  private Boolean themeable;

  //CAR_TIPOGEOM "POLYGON",...
  @Column(name = "car_tipogeom")
  private String geometryType;

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

  public Boolean getVisible() {
    return visible;
  }

  public void setVisible(Boolean visible) {
    this.visible = visible;
  }

  public Integer getTransparency() {
    return transparency;
  }

  public void setTransparency(Integer transparency) {
    this.transparency = transparency;
  }

  public Boolean getQueryable() {
    return queryable;
  }

  public void setQueryable(Boolean queryable) {
    this.queryable = queryable;
  }

  public Boolean getQueryAct() {
    return queryAct;
  }

  public void setQueryAct(Boolean queryAct) {
    this.queryAct = queryAct;
  }

  public Boolean getQueryLay() {
    return queryLay;
  }

  public void setQueryLay(Boolean queryLay) {
    this.queryLay = queryLay;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Integer getMinimumScale() {
    return minimumScale;
  }

  public void setMinimumScale(Integer minimumScale) {
    this.minimumScale = minimumScale;
  }

  public Integer getMaximumScale() {
    return maximumScale;
  }

  public void setMaximumScale(Integer maximumScale) {
    this.maximumScale = maximumScale;
  }

  public String getLayers() {
    return layers;
  }

  public void setLayers(String layers) {
    this.layers = layers;
  }

  public Service getService() {
    return service;
  }

  public void setService(Service service) {
    this.service = service;
  }

  public Connection getConnection() {
    return connection;
  }

  public void setConnection(Connection connection) {
    this.connection = connection;
  }

  public Set<CartographyAvailability> getAvailabilities() {
    return availabilities;
  }

  public void setAvailabilities(Set<CartographyAvailability> availabilities) {
    this.availabilities = availabilities;
  }

  public Boolean getSelectable() {
    return selectable;
  }

  public void setSelectable(Boolean selectable) {
    this.selectable = selectable;
  }

  public String getSelectionLayer() {
    return selectionLayer;
  }

  public void setSelectionLayer(String selectionLayer) {
    this.selectionLayer = selectionLayer;
  }

  public Service getSelectionService() {
    return selectionService;
  }

  public void setSelectionService(Service selectionService) {
    this.selectionService = selectionService;
  }

  public String getLegendTip() {
    return legendTip;
  }

  public void setLegendTip(String legendTip) {
    this.legendTip = legendTip;
  }

  public String getLegendUrl() {
    return legendUrl;
  }

  public void setLegendUrl(String legendUrl) {
    this.legendUrl = legendUrl;
  }

  public Boolean getEditable() {
    return editable;
  }

  public void setEditable(Boolean editable) {
    this.editable = editable;
  }

  public String getMetadataUrl() {
    return metadataUrl;
  }

  public void setMetadataUrl(String metadataUrl) {
    this.metadataUrl = metadataUrl;
  }

  public Boolean getThemeable() {
    return themeable;
  }

  public void setThemeable(Boolean themeable) {
    this.themeable = themeable;
  }

  public String getGeometryType() {
    return geometryType;
  }

  public void setGeometryType(String geometryType) {
    this.geometryType = geometryType;
  }


}