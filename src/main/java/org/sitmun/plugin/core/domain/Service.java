package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="stm_servicio")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ser_codigo")
    private long id;
    
    
    @Column(name="ser_nombre")
    private String name;
    
    @Column(name="ser_url")
    private String url;
    
    @Column(name="ser_proj")
    private String projections;
    
    @Column(name="ser_leyenda")
    private String legend;
    
    @Column(name="ser_infourl")
    private String infoUrl;
    
    @Column(name="ser_f_alta")
    private Date createdDate;
    
    @OneToMany(mappedBy="service",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Cartography> layers = new HashSet<>();
    
    @ManyToOne
    @JoinColumn(name="ser_codcon")
    private Connection connection;

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

      
   
}