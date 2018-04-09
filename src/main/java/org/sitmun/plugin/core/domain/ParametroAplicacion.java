package org.sitmun.plugin.core.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="stm_paramapp")
public class ParametroAplicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="pap_codigo")
    private long id;
    
    @Column(name="pap_nombre")
    private String nombre;
    
    @Column(name="pap_valor")
    private String valor;
    
    @Column(name="pap_tipo")
    private String tipo;
    
    
    @ManyToOne
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="pap_codapp")
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
     * @return the valor
     */
    public String getValor() {
        return valor;
    }


    /**
     * @param valor the valor to set
     */
    public void setValor(String valor) {
        this.valor = valor;
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