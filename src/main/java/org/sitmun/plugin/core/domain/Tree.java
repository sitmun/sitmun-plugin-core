package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="stm_tree")
public class Tree {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    
    
    private String name;
    
    private String tooltip;
    
    @Column(name="stm_order")
    private Integer order;
    
    private Boolean active;
    
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<CartoGroup> cartoGroups;
    
    
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
     * @return the cartoGroups
     */
    public Set<CartoGroup> getCartoGroups() {
        return cartoGroups;
    }


    /**
     * @param cartoGroups the cartoGroups to set
     */
    public void setCartoGroups(Set<CartoGroup> cartoGroups) {
        this.cartoGroups = cartoGroups;
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
     * @return the tooltip
     */
    public String getTooltip() {
        return tooltip;
    }


    /**
     * @param tooltip the tooltip to set
     */
    public void setTooltip(String tooltip) {
        this.tooltip = tooltip;
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
     * @return the active
     */
    public Boolean getActive() {
        return active;
    }


    /**
     * @param active the active to set
     */
    public void setActive(Boolean active) {
        this.active = active;
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


    private Date created;
}