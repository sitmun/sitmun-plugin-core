package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_grptar")
public class GrupoTarea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="gta_codigo")
    private long id;
    
    @Column(name="gta_nombre")
    private String nombre;

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