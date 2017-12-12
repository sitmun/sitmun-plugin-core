package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class AvailableCarto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private Date created;
    
    
    @ManyToOne
    private Territory territory;
    
    @ManyToOne
    private Carto carto;

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

    /**
     * @return the territory
     */
    public Territory getTerritory() {
        return territory;
    }

    /**
     * @param territory the territory to set
     */
    public void setTerritory(Territory territory) {
        this.territory = territory;
    }

    /**
     * @return the carto
     */
    public Carto getCarto() {
        return carto;
    }

    /**
     * @param carto the carto to set
     */
    public void setCarto(Carto carto) {
        this.carto = carto;
    }
}