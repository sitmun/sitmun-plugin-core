package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="stm_carto")
public class Cartografia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="car_codigo")
    private long id;
        
    @Column(name="car_nombre")
    private String nombre;    

    @Column(name="car_tipo")
    private String tipo;
    
    @Column(name="car_visible")
    private Boolean visible;
    
    @Column(name="car_transp")
    private Integer transparencia;
    
    @Column(name="car_queryabl")
    private Boolean queryable;
    
    @Column(name="car_queryact")
    private Boolean queryAct;
    
    @Column(name="car_querylay")
    private Boolean queryLay;
    
    @Column(name="car_f_alta")
    private Date fechaAlta;
    
    @Column(name="car_orden")
    private Integer orden;
    
    @Column(name="car_esc_min")
    private Integer escalaMinima;
    
    @Column(name="car_esc_max")
    private Integer escalaMaxima;
    
    //Nombre de las capa
    @Column(name="car_capas")
    private String capas;
    
    @ManyToOne
    @JoinColumn(name="car_codser")
    private  Servicio servicio;
    
    @ManyToOne
    @JoinColumn(name="car_codcon")
    private  Conexion conexion;
    
    //territorios dónde estará disponible esta cartografía se gestiona desde aquí
    @OneToMany(mappedBy="cartografia", cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<DisponibilidadCartografia> disponibilidades = new HashSet<>();
    
        

    //CAR_SELECTABL   
    @Column(name="car_selectable")
    private Boolean seleccionable;
    
    //CAR_SELECTLAY
    @Column(name="car_seleclay")
    private String capaSeleccion;  
    
    //CAR_CODSERSEL
    @ManyToOne
    @JoinColumn(name="car_codsersel")
    private  Servicio servicioSeleccion;

    //CAR_LEYENDTIP
    @Column(name="car_leyendtip")
    private String tipLeyenda;
    
    //CAR_LEYENDURL
    @Column(name="car_leyendurl")
    private String urlLeyenda;
    
    //CAR_EDITABLE 
    @Column(name="car_editable")
    private Boolean editable;

    //CAR_METAURL
    @Column(name="car_metaurl")
    private String urlMetadato;    

    //CAR_TEMATIZABLE
    @Column(name="car_tematizable")
    private Boolean tematizable;
    
    //CAR_TIPOGEOM "POLYGON",...
    @Column(name="car_tipogeom")
    private String tipoGeometria;

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
     * @return the visible
     */
    public Boolean getVisible() {
        return visible;
    }

    /**
     * @param visible the visible to set
     */
    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    /**
     * @return the transparencia
     */
    public Integer getTransparencia() {
        return transparencia;
    }

    /**
     * @param transparencia the transparencia to set
     */
    public void setTransparencia(Integer transparencia) {
        this.transparencia = transparencia;
    }

    /**
     * @return the queryable
     */
    public Boolean getQueryable() {
        return queryable;
    }

    /**
     * @param queryable the queryable to set
     */
    public void setQueryable(Boolean queryable) {
        this.queryable = queryable;
    }

    /**
     * @return the queryAct
     */
    public Boolean getQueryAct() {
        return queryAct;
    }

    /**
     * @param queryAct the queryAct to set
     */
    public void setQueryAct(Boolean queryAct) {
        this.queryAct = queryAct;
    }

    /**
     * @return the queryLay
     */
    public Boolean getQueryLay() {
        return queryLay;
    }

    /**
     * @param queryLay the queryLay to set
     */
    public void setQueryLay(Boolean queryLay) {
        this.queryLay = queryLay;
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
     * @return the escalaMinima
     */
    public Integer getEscalaMinima() {
        return escalaMinima;
    }

    /**
     * @param escalaMinima the escalaMinima to set
     */
    public void setEscalaMinima(Integer escalaMinima) {
        this.escalaMinima = escalaMinima;
    }

    /**
     * @return the escalaMaxima
     */
    public Integer getEscalaMaxima() {
        return escalaMaxima;
    }

    /**
     * @param escalaMaxima the escalaMaxima to set
     */
    public void setEscalaMaxima(Integer escalaMaxima) {
        this.escalaMaxima = escalaMaxima;
    }

    /**
     * @return the capas
     */
    public String getCapas() {
        return capas;
    }

    /**
     * @param capas the capas to set
     */
    public void setCapas(String capas) {
        this.capas = capas;
    }

    /**
     * @return the servicio
     */
    public Servicio getServicio() {
        return servicio;
    }

    /**
     * @param servicio the servicio to set
     */
    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    /**
     * @return the conexion
     */
    public Conexion getConexion() {
        return conexion;
    }

    /**
     * @param conexion the conexion to set
     */
    public void setConexion(Conexion conexion) {
        this.conexion = conexion;
    }

    /**
     * @return the disponibilidades
     */
    public Set<DisponibilidadCartografia> getDisponibilidades() {
        return disponibilidades;
    }

    /**
     * @param disponibilidades the disponibilidades to set
     */
    public void setDisponibilidades(
            Set<DisponibilidadCartografia> disponibilidades) {
        this.disponibilidades = disponibilidades;
    }

    /**
     * @return the seleccionable
     */
    public Boolean getSeleccionable() {
        return seleccionable;
    }

    /**
     * @param seleccionable the seleccionable to set
     */
    public void setSeleccionable(Boolean seleccionable) {
        this.seleccionable = seleccionable;
    }

    /**
     * @return the capaSeleccion
     */
    public String getCapaSeleccion() {
        return capaSeleccion;
    }

    /**
     * @param capaSeleccion the capaSeleccion to set
     */
    public void setCapaSeleccion(String capaSeleccion) {
        this.capaSeleccion = capaSeleccion;
    }

    /**
     * @return the servicioSeleccion
     */
    public Servicio getServicioSeleccion() {
        return servicioSeleccion;
    }

    /**
     * @param servicioSeleccion the servicioSeleccion to set
     */
    public void setServicioSeleccion(Servicio servicioSeleccion) {
        this.servicioSeleccion = servicioSeleccion;
    }

    /**
     * @return the tipLeyenda
     */
    public String getTipLeyenda() {
        return tipLeyenda;
    }

    /**
     * @param tipLeyenda the tipLeyenda to set
     */
    public void setTipLeyenda(String tipLeyenda) {
        this.tipLeyenda = tipLeyenda;
    }

    /**
     * @return the urlLeyenda
     */
    public String getUrlLeyenda() {
        return urlLeyenda;
    }

    /**
     * @param urlLeyenda the urlLeyenda to set
     */
    public void setUrlLeyenda(String urlLeyenda) {
        this.urlLeyenda = urlLeyenda;
    }

    /**
     * @return the editable
     */
    public Boolean getEditable() {
        return editable;
    }

    /**
     * @param editable the editable to set
     */
    public void setEditable(Boolean editable) {
        this.editable = editable;
    }

    /**
     * @return the urlMetadato
     */
    public String getUrlMetadato() {
        return urlMetadato;
    }

    /**
     * @param urlMetadato the urlMetadato to set
     */
    public void setUrlMetadato(String urlMetadato) {
        this.urlMetadato = urlMetadato;
    }

    /**
     * @return the tematizable
     */
    public Boolean getTematizable() {
        return tematizable;
    }

    /**
     * @param tematizable the tematizable to set
     */
    public void setTematizable(Boolean tematizable) {
        this.tematizable = tematizable;
    }

    /**
     * @return the tipoGeometria
     */
    public String getTipoGeometria() {
        return tipoGeometria;
    }

    /**
     * @param tipoGeometria the tipoGeometria to set
     */
    public void setTipoGeometria(String tipoGeometria) {
        this.tipoGeometria = tipoGeometria;
    }  
    
    
}