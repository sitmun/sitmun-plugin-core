package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="stm_task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private String name;
    
    @Column(name="stm_order")
    private Integer order;
    
    
    private Date created;


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


    /**
     * @return the name
     */
    public String getName() {
        return name;
    }


    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }


    /**
     * @return the order
     */
    public Integer getOrder() {
        return order;
    }


    /**
     * @param order the order to set
     */
    public void setOrder(Integer order) {
        this.order = order;
    }


    /**
     * @return the created
     */
    public Date getCreated() {
        return created;
    }


    /**
     * @param created the created to set
     */
    public void setCreated(Date created) {
        this.created = created;
    }
}