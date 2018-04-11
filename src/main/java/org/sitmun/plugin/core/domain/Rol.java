package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_roles")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="rol_codigo")
    private long id;
    
    @Column(name="rol_nombre")
    private String nombre;
    
    @Column(name="rol_observ")
    private String observaciones;

    
    //relación Rol-Aplicacion navegable desde Rol
    //relación Rol-Aplicación N-1 de momento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rol_codapp")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    @JsonIgnore
    private Aplicacion aplicacion;


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
     * @return the observaciones
     */
    public String getObservaciones() {
        return observaciones;
    }


    /**
     * @param observaciones the observaciones to set
     */
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }


    /**
     * @return the aplicacion
     */
    public Aplicacion getAplicacion() {
        return aplicacion;
    }


    /**
     * @param aplicacion the aplicacion to set
     */
    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }
    
    
    
    
    
}