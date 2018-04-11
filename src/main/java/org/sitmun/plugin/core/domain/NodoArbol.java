package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_arbolnod")
public class NodoArbol {

    //Códigos numéricos
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="arn_codigo")
    private long id;
    
    
    @Column(name="arn_nombre")
    private String nombre;
    
    //Campos de los nodos, cambiar prefijo arb por arn
    
    @Column(name="arn_tooltip")
    private String tooltip;
    
    @Column(name="arn_orden")
    private Integer orden;
    
    @Column(name="arn_activo")
    private Boolean activo;
    
    @JoinColumn(name="arn_codpadre")
    @ManyToOne
    @NotNull
    @JsonIgnore
    private NodoArbol padre;    
    
    @JoinColumn(name="arn_codarb")
    @ManyToOne
    private Arbol arbol;    

    @JoinColumn(name="arb_codcar")
    @ManyToOne
    private Cartografia cartografia;

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
     * @return the tooltip
     */
    public String getTooltip() {
        return tooltip;
    }

    /**
     * @param tooltip the tooltip to set
     */
    public void setTooltip(String tooltip) {
        this.tooltip = tooltip;
    }

    /**
     * @return the orden
     */
    public Integer getOrden() {
        return orden;
    }

    /**
     * @param orden the orden to set
     */
    public void setOrden(Integer orden) {
        this.orden = orden;
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
     * @return the padre
     */
    public NodoArbol getPadre() {
        return padre;
    }

    /**
     * @param padre the padre to set
     */
    public void setPadre(NodoArbol padre) {
        this.padre = padre;
    }

    /**
     * @return the arbol
     */
    public Arbol getArbol() {
        return arbol;
    }

    /**
     * @param arbol the arbol to set
     */
    public void setArbol(Arbol arbol) {
        this.arbol = arbol;
    }

    /**
     * @return the cartografia
     */
    public Cartografia getCartografia() {
        return cartografia;
    }

    /**
     * @param cartografia the cartografia to set
     */
    public void setCartografia(Cartografia cartografia) {
        this.cartografia = cartografia;
    }
    

    
}