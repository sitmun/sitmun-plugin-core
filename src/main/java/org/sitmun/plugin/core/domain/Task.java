package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="stm_tarea")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tar_codigo")
    private long id;
    
    @Column(name="tar_nombre")
    private String name;
    
    @Column(name="tar_orden")
    private Integer order;
    
    
    @Column(name="tar_f_alta")
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name="tar_codcon")
    private Connection connection;
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "stm_roltar", joinColumns = @JoinColumn(name = "rta_codrol"), inverseJoinColumns = @JoinColumn(name = "rta_codtar"))            
    private Set<Role> roles;
    
    @OneToMany(mappedBy="task", cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<TaskAvailability> availabilities = new HashSet<>();    
    
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

	@ManyToOne
    @JoinColumn(name="tar_codgta")
    private TaskGroup group;
    
    @ManyToOne
    @JoinColumn(name="tar_codtta")
    private TaskType type;



}