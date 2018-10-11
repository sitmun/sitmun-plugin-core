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

import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;

@Entity
@Table(name = "stm_tarea")
public class Task implements Identifiable{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "tar_codigo")
	private long id;

	@Column(name = "tar_nombre")
	private String name;

	@Column(name = "tar_orden")
	private Integer order;

	@Column(name = "tar_f_alta")
	private Date createdDate;

	@ManyToOne
	@JoinColumn(name = "tar_codcon")
	private Connection connection;

	public Set<TaskParameter> getParameters() {
		return parameters;
	}

	public void setParameters(Set<TaskParameter> parameters) {
		this.parameters = parameters;
	}

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "stm_roltar", joinColumns = @JoinColumn(name = "rta_codrol"), inverseJoinColumns = @JoinColumn(name = "rta_codtar"))
	private Set<Role> roles;

	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TaskAvailability> availabilities = new HashSet<>();

	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TaskParameter> parameters = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "tar_codgta")
	private TaskGroup group;

	@ManyToOne
	@JoinColumn(name = "tar_codtta")
	private TaskType type;


	@ManyToOne
	@JoinColumn(name = "tar_codtui")
	private TaskUI ui;

	public TaskUI getUi() {
		return ui;
	}

	public void setUi(TaskUI ui) {
		this.ui = ui;
	}

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

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<TaskAvailability> getAvailabilities() {
		return availabilities;
	}

	public void setAvailabilities(Set<TaskAvailability> availabilities) {
		this.availabilities = availabilities;
	}

	public TaskGroup getGroup() {
		return group;
	}

	public void setGroup(TaskGroup group) {
		this.group = group;
	}

	public TaskType getType() {
		return type;
	}

	public void setType(TaskType type) {
		this.type = type;
	}
	
	public ResourceSupport toResource(RepositoryEntityLinks links) {
		Link selfLink = links.linkForSingleResource(this).withSelfRel();
		ResourceSupport res = new Resource<>(this, selfLink);
		res.add(links.linkForSingleResource(this).slash("availabilities").withRel("availabilities"));
		res.add(links.linkForSingleResource(this).slash("connection").withRel("connection"));
		res.add(links.linkForSingleResource(this).slash("group").withRel("group"));
		res.add(links.linkForSingleResource(this).slash("parameters").withRel("parameters"));
		res.add(links.linkForSingleResource(this).slash("roles").withRel("roles"));
		res.add(links.linkForSingleResource(this).slash("type").withRel("type"));
		res.add(links.linkForSingleResource(this).slash("ui").withRel("ui"));
		return res;
	}

}