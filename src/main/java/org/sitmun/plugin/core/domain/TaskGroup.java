package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_grptar")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="gta_codigo")
    private long id;
    
    @Column(name="gta_nombre")
    private String name;

    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
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