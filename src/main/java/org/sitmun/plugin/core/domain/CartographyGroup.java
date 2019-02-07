package org.sitmun.plugin.core.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

@Entity
@Table(name = "stm_grpcarto")
public class CartographyGroup implements Identifiable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "gca_codigo")
	private long id;

	@Column(name = "gca_nombre", length = 80)
	private String name;

	@Column(name = "gca_tipo", length = 30)
	private String type;

	@ManyToMany
	@JoinTable(name = "stm_gcacar", joinColumns = @JoinColumn(name = "gcc_codgca",foreignKey=@ForeignKey(name = "STM_GCC_FK_GCA")), inverseJoinColumns = @JoinColumn(name = "gcc_codcar",foreignKey=@ForeignKey(name = "STM_GCC_FK_CAR")))
	private Set<Cartography> members;

	// roles para los que estará disponible este grupo de cartografía se gestiona
	// desde aquí
	@ManyToMany
	@JoinTable(name = "stm_rolgca", joinColumns = @JoinColumn(name = "rgc_codrol",foreignKey=@ForeignKey(name = "STM_RGC_FK_ROL")), inverseJoinColumns = @JoinColumn(name = "rgc_codgca",foreignKey=@ForeignKey(name = "STM_RGC_FK_GCA")))
	private Set<Role> roles;

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

	public ResourceSupport toResource(RepositoryEntityLinks links) {
		Link selfLink = links.linkForSingleResource(this).withSelfRel();
		ResourceSupport res = new Resource<>(this, selfLink);
		res.add(links.linkForSingleResource(this).slash("members").withRel("members"));
		res.add(links.linkForSingleResource(this).slash("roles").withRel("roles"));
		return res;
	}

}