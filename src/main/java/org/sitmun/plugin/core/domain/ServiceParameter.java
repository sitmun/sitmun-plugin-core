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
@Table(name = "stm_paramser")
public class ServiceParameter {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "pse_codigo")
	private long id;

	@Column(name = "pse_nombre", length = 30)
	private String name;

	@Column(name = "pse_valor", length = 250)
	private String value;

	@Column(name = "pse_tipo", length = 250)
	private String type;

	@ManyToOne
	@NotNull
	// @OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "pse_codser",foreignKey=@ForeignKey(name = "STM_PSE_FK_SER"))
	private Service service;

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

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

}