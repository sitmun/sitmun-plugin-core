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

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

@Entity
@Table(name = "stm_carto")
public class Cartography implements Identifiable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "car_codigo")
	private long id;

	@Column(name = "car_nombre", length = 100)
	private String name;

	@Column(name = "car_tipo", length = 30)
	private String type;

	@Column(name = "car_visible")
	private Boolean visible;

	@Column(name = "car_transp", length = 11)
	private Integer transparency;

	@Column(name = "car_queryabl")
	private Boolean queryable;

	@Column(name = "car_queryact")
	private Boolean queryAct;

	@Column(name = "car_querylay", length = 500)
	private Boolean queryLay;

	@Column(name = "car_f_alta")
	private Date createdDate;

	@Column(name = "car_orden", length = 11)
	private Integer order;

	@Column(name = "car_esc_min", length = 11)
	private Integer minimumScale;

	@Column(name = "car_esc_max", length = 11)
	private Integer maximumScale;

	// Nombre de las capa
	@Column(name = "car_capas", length = 500)
	private String layers;

	@ManyToOne
	@JoinColumn(name = "car_codser",foreignKey=@ForeignKey(name = "STM_CAR_FK_SER"))
	private Service service;

	@ManyToOne
	@JoinColumn(name = "car_codcon",foreignKey=@ForeignKey(name = "STM_CAR_FK_CON"))
	private Connection connection;

	@OneToMany(mappedBy = "cartography", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<CartographyAvailability> availabilities = new HashSet<>();

	// CAR_SELECTABL
	@Column(name = "car_selectabl")
	private Boolean selectable;

	// CAR_SELECTLAY
	@Column(name = "car_selectlay", length = 500)
	private String selectionLayer;

	// CAR_CODSERSEL
	@ManyToOne
	@JoinColumn(name = "car_codsersel",foreignKey=@ForeignKey(name = "STM_CAR_FK_SERSEL"))
	private Service selectionService;

	// CAR_LEYENDTIP
	@Column(name = "car_leyendtip", length = 50)
	private String legendTip;

	// CAR_LEYENDURL
	@Column(name = "car_leyendurl", length = 250)
	private String legendUrl;

	// CAR_EDITABLE
	@Column(name = "car_editable")
	private Boolean editable;

	// CAR_METAURL
	@Column(name = "car_metaurl")
	private String metadataUrl;

	// CAR_TEMATIZABLE
	@Column(name = "car_tematizable")
	private Boolean themeable;

	// CAR_TIPOGEOM "POLYGON",...
	@Column(name = "car_tipogeom")
	private String geometryType;

	public Long getId() {
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

	public ResourceSupport toResource(RepositoryEntityLinks links) {
		Link selfLink = links.linkForSingleResource(this).withSelfRel();
		ResourceSupport res = new Resource<>(this, selfLink);
		res.add(links.linkForSingleResource(this).slash("availabilities").withRel("availabilities"));
		res.add(links.linkForSingleResource(this).slash("connection").withRel("connection"));
		res.add(links.linkForSingleResource(this).slash("selectionService").withRel("selectionService"));
		res.add(links.linkForSingleResource(this).slash("service").withRel("service"));
		return res;
	}

}