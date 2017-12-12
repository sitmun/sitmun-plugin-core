package org.sitmun.plugin.core.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private String username;
    
    private String password;

    private String firstName;
    private String lastName;
    
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserPosition> positions;
    
    
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<UserRole> roles;

    /**
     * @return the positions
     */
    public Set<UserPosition> getPositions() {
        return positions;
    }

    /**
     * @param positions the positions to set
     */
    public void setPositions(Set<UserPosition> positions) {
        this.positions = positions;
    }

    /**
     * @return the roles
     */
    public Set<UserRole> getRoles() {
        return roles;
    }

    /**
     * @param roles the roles to set
     */
    public void setRoles(Set<UserRole> roles) {
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

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
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}