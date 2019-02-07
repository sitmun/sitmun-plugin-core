package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.ForeignKey;
import javax.validation.constraints.NotNull;

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

@Entity
@Table(name = "stm_appfon", uniqueConstraints = { @UniqueConstraint(columnNames = { "apf_codapp", "apf_codfon" }) })
public class ApplicationBackground implements Identifiable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "apf_codigo")
	private long id;

	@Column(name = "apf_orden")
	private Integer order;

	@ManyToOne
	@JoinColumn(name = "apf_codapp",foreignKey=@ForeignKey(name = "STM_APF_FK_APP"))
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Application application;

	@ManyToOne
	@JoinColumn(name = "apf_codfon",foreignKey=@ForeignKey(name = "STM_APF_FK_FON"))
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Background background;

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public Background getBackground() {
		return background;
	}

	public void setBackground(Background background) {
		this.background = background;
	}

	public ResourceSupport toResource(RepositoryEntityLinks links) {
		Link selfLink = links.linkForSingleResource(this).withSelfRel();
		ResourceSupport res = new Resource<>(this, selfLink);
		res.add(links.linkForSingleResource(this).slash("application").withRel("application"));
		res.add(links.linkForSingleResource(this).slash("background").withRel("background"));
		return res;
	}

}