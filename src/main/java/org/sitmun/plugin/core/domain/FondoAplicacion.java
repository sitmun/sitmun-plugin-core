package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_appfon",uniqueConstraints={
        @UniqueConstraint(columnNames={"apf_codapp", "apf_codfon"})
     })
public class FondoAplicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="apf_orden")
    private Integer orden;
    
    
    @ManyToOne
    @JoinColumn(name="apf_codapp")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    @JsonIgnore
    private Aplicacion aplicacion;
    
    @ManyToOne
    @JoinColumn(name="apf_codfon")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Fondo fondo;
    
   

    /**
     * @return the orden
     */
    public Integer getOrden() {
        return orden;
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
     * @param orden the orden to set
     */
    public void setOrden(Integer orden) {
        this.orden = orden;
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

    /**
     * @return the fondo
     */
    public Fondo getFondo() {
        return fondo;
    }

    /**
     * @param fondo the fondo to set
     */
    public void setFondo(Fondo fondo) {
        this.fondo = fondo;
    }

    
}