package org.sitmun.plugin.core.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_paramser")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ServiceParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="pse_codigo")
    private long id;
    
    @Column(name="pse_nombre")
    private String name;
    
    @Column(name="pse_valor")
    private String value;
    
    @Column(name="pse_tipo")
    private String type;
    
    @ManyToOne
    @NotNull
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="pse_codser")
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