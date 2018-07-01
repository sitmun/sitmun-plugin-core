package org.sitmun.plugin.core.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_paramapp")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApplicationParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="pap_codigo")
    private long id;
    
    @Column(name="pap_nombre")
    private String name;
    
    @Column(name="pap_valor")
    private String value;
    
    @Column(name="pap_tipo")
    private String type;    
    
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

	@ManyToOne
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="pap_codapp")
    @JsonIgnore
    private Application application;


       
 }