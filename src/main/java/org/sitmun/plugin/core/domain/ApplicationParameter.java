package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(name = "stm_paramapp")
public class ApplicationParameter {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "pap_codigo")
	private long id;

	@Column(name = "pap_nombre", length = 30)
	private String name;

	@Column(name = "pap_valor", length = 250)
	private String value;

	@Column(name = "pap_tipo", length = 250)
	private String type;
	
	@ManyToOne
	@NotNull
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "pap_codapp",foreignKey=@ForeignKey(name = "STM_PAP_FK_APP"))
	private Application application;

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

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

}