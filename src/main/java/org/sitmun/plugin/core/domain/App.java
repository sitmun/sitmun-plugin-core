package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class App {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
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
     * @return the tree
     */
    public Tree getTree() {
        return tree;
    }


    /**
     * @param tree the tree to set
     */
    public void setTree(Tree tree) {
        this.tree = tree;
    }


    /**
     * @return the type
     */
    public String getType() {
        return type;
    }


    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }


    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }


    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }


    /**
     * @return the theme
     */
    public String getTheme() {
        return theme;
    }


    /**
     * @param theme the theme to set
     */
    public void setTheme(String theme) {
        this.theme = theme;
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


    private String type;
    
    private String title;
    
    private String theme;
    
    private Date created;
    
    
    @OneToMany(mappedBy = "app", cascade = CascadeType.ALL)
    private Set<UserRole> roles;
    
    @ManyToOne
    private Tree tree;
    
    

}