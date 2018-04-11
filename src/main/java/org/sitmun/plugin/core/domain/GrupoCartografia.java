package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="stm_grpcarto")
public class GrupoCartografia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="gca_codigo")
    private long id;
    
    @Column(name="gca_nombre")
    private String nombre;
    
    @Column(name="gca_tipo")
    private String tipo;
        
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "stm_gcacar", joinColumns = @JoinColumn(name = "gcc_codcar"), inverseJoinColumns = @JoinColumn(name = "gcc_codgca"))
    private Set<Cartografia> elementos;
    
    
    //roles para los que estará disponible este grupo de cartografía se gestiona desde aquí
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "stm_rolgca", joinColumns = @JoinColumn(name = "rgc_codrol"), inverseJoinColumns = @JoinColumn(name = "rgc_codgca"))            
    private Set<Rol> roles;


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
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }


    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    /**
     * @return the tipo
     */
    public String getTipo() {
        return tipo;
    }


    /**
     * @param tipo the tipo to set
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    /**
     * @return the elementos
     */
    public Set<Cartografia> getElementos() {
        return elementos;
    }


    /**
     * @param elementos the elementos to set
     */
    public void setElementos(Set<Cartografia> elementos) {
        this.elementos = elementos;
    }


    /**
     * @return the roles
     */
    public Set<Rol> getRoles() {
        return roles;
    }


    /**
     * @param roles the roles to set
     */
    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }    
  


     
}