package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_paramtta")
public class ParametroTarea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ptt_codigo")
    private long id;
    
    @Column(name="ptt_nombre")
    private String nombre;
    
    @Column(name="ptt_valor")
    private String valor;
    
    @Column(name="ptt_tipo")
    private String tipo;
    
    
    //En los datos exportados la relación es con Tarea y hay más campos ptt_codtar
    @ManyToOne
    @NotNull
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="ptt_codtar")
    private Tarea tarea;
    
    //orden
    @Column(name="ptt_orden")
    private Integer orden;
        


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


    
    
 }