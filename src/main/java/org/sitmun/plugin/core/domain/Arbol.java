package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="stm_arbol")
public class Arbol {

    //Códigos numéricos
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="arb_codigo")
    private long id;
    
    
    /**
     * @return the nodos
     */
    public Set<NodoArbol> getNodos() {
        return nodos;
    }


    /**
     * @param nodos the nodos to set
     */
    public void setNodos(Set<NodoArbol> nodos) {
        this.nodos = nodos;
    }


    @Column(name="arb_nombre")
    private String nombre;
    
    @OneToMany(mappedBy="arbol",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<NodoArbol> nodos = new HashSet<>();


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
    
    
  
    

    
}