package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_fondo")
public class Fondo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="fon_codigo")
    private long id;
    
    @Column(name="fon_nombre")
    private String nombre;
    
    @Column(name="fon_desc")
    private String descripcion;
    
    
    @Column(name="fon_activo")
    private Boolean activo;
    
    @Column(name="fon_f_alta")
    private Date fechaAlta;
    
    @ManyToOne
    @JoinColumn(name="fon_codcga")
    @NotNull
    private GrupoCartografia grupoCartografia;

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
     * @return the descripcion
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * @param descripcion the descripcion to set
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * @return the activo
     */
    public Boolean getActivo() {
        return activo;
    }

    /**
     * @param activo the activo to set
     */
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    /**
     * @return the fechaAlta
     */
    public Date getFechaAlta() {
        return fechaAlta;
    }

    /**
     * @param fechaAlta the fechaAlta to set
     */
    public void setFechaAlta(Date fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    /**
     * @return the grupoCartografia
     */
    public GrupoCartografia getGrupoCartografia() {
        return grupoCartografia;
    }

    /**
     * @param grupoCartografia the grupoCartografia to set
     */
    public void setGrupoCartografia(GrupoCartografia grupoCartografia) {
        this.grupoCartografia = grupoCartografia;
    }
}