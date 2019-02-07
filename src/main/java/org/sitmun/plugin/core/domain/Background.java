package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

@Entity
@Table(name = "stm_fondo")
public class Background implements Identifiable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "fon_codigo")
	private long id;

	@Column(name = "fon_nombre", length = 30)
	private String name;

	@Column(name = "fon_desc", length = 250)
	private String description;

	@Column(name = "fon_activo")
	private Boolean active;

	@Column(name = "fon_f_alta")
	private Date createdDate;

	@ManyToOne
	@JoinColumn(name = "fon_codgca",foreignKey=@ForeignKey(name = "STM_FON_FK_GCA"))
	@NotNull
	private CartographyGroup cartographyGroup;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public CartographyGroup getCartographyGroup() {
		return cartographyGroup;
	}

	public void setCartographyGroup(CartographyGroup cartographyGroup) {
		this.cartographyGroup = cartographyGroup;
	}

	public ResourceSupport toResource(RepositoryEntityLinks links) {
		Link selfLink = links.linkForSingleResource(this).withSelfRel();
		ResourceSupport res = new Resource<>(this, selfLink);
		res.add(links.linkForSingleResource(this).slash("cartographyGroup").withRel("cartographyGroup"));
		return res;
	}

}