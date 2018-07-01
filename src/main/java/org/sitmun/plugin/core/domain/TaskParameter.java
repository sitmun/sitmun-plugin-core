package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_paramtta")
public class TaskParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ptt_codigo")
    private long id;
    
    @Column(name="ptt_nombre")
    private String name;
    
    @Column(name="ptt_valor")
    private String value;
    
    @Column(name="ptt_tipo")
    private String type;
    
    @ManyToOne
    @NotNull
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="ptt_codtar")
    private Task task;
    
    @Column(name="ptt_orden")
    private Integer order;

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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}
        

    
 }