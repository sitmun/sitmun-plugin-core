package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class UserPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
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
     * @return the position
     */
    public String getPosition() {
        return position;
    }

    /**
     * @param position the position to set
     */
    public void setPosition(String position) {
        this.position = position;
    }

    /**
     * @return the organization
     */
    public String getOrganization() {
        return organization;
    }

    /**
     * @param organization the organization to set
     */
    public void setOrganization(String organization) {
        this.organization = organization;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
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
     * @return the dated
     */
    public Date getDated() {
        return dated;
    }

    /**
     * @param dated the dated to set
     */
    public void setDated(Date dated) {
        this.dated = dated;
    }

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
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

    private String position;
    
    private String organization;
    
    private String email;
    
    private Date created;
    
    private Date dated;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Territory territory;
}