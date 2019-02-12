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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_disptarea", uniqueConstraints = { @UniqueConstraint(columnNames = { "dta_codter", "dta_codtar" }) })
public class TaskAvailability {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "dta_codigo")
	private long id;
	
	@Column(name = "dta_f_alta")
	private Date createdDate;
	@ManyToOne
	@JoinColumn(name = "dta_codter",foreignKey=@ForeignKey(name = "STM_DTA_FK_TER"))
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Territory territory;
	@ManyToOne
	@JoinColumn(name = "dta_codtar",foreignKey=@ForeignKey(name = "STM_DTA_FK_TAR"))
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Task task;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Territory getTerritory() {
		return territory;
	}

	public void setTerritory(Territory territory) {
		this.territory = territory;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

}