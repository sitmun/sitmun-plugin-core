package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_tipotarea")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tta_codigo")
    private long id;
    
    @Column(name="tta_nombre")
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