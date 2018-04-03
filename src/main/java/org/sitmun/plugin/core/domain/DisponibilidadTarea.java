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
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="stm_disptarea", uniqueConstraints={
        @UniqueConstraint(columnNames={"dta_codter", "dta_codtar"})
     })
public class DisponibilidadTarea {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="dta_codigo")
    private long id;
/*
    @EmbeddedId
    private DisponibilidadTareaId id; 
  */  
    @Column(name="dta_f_alta")
    private Date fechaAlta;    
    
    @ManyToOne
    //@MapsId("territorioId")    
    @JoinColumn(name="dta_codter")    
    private Territorio territorio;    
    
    @ManyToOne
    //@MapsId("tareaId")    
    @JoinColumn(name="dta_codtar")
    private Tarea tarea;

    

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
     * @return the territorio
     */
    public Territorio getTerritorio() {
        return territorio;
    }

    /**
     * @param territorio the territorio to set
     */
    public void setTerritorio(Territorio territorio) {
        this.territorio = territorio;
    }

    /**
     * @return the tarea
     */
    public Tarea getTarea() {
        return tarea;
    }

    /**
     * @param tarea the tarea to set
     */
    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }
}