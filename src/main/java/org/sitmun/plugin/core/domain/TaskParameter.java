package org.sitmun.plugin.core.domain;

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

@Entity
@Table(name = "stm_paramtta")
public class TaskParameter {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "ptt_codigo")
	private long id;

	@Column(name = "ptt_nombre", length = 50)
	private String name;

	@Column(name = "ptt_valor", length = 512)
	private String value;

	@Column(name = "ptt_tipo", length = 30)
	private String type;

	@ManyToOne
	@NotNull
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "ptt_codtar",foreignKey=@ForeignKey(name = "STM_PTT_FK_TAR"))
	private Task task;

	@Column(name = "ptt_orden")
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