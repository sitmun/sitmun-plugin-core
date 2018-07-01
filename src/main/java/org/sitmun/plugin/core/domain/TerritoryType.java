package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_tipogrp")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TerritoryType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tgr_codigo")
    private long id;
    
    @Column(name="tgr_nombre")
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