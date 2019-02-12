package org.sitmun.plugin.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "stm_tipotarea")
public class TaskType {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "tta_codigo")
	private long id;

	@Column(name = "tta_nombre", length = 30)
	private String name;

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

}