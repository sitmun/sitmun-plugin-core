package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="stm_servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ser_codigo")
    private long id;
    
    
    @Column(name="ser_nombre")
    private String nombre;
    
    @Column(name="ser_url")
    private String url;
    
    @Column(name="ser_proj")
    private String proyecciones;
    
    @Column(name="ser_leyenda")
    private String leyenda;
    
    @Column(name="ser_infourl")
    private String infoUrl;
    
    @Column(name="ser_f_alta")
    private Date fechaAlta;
    
    @OneToMany(mappedBy="servicio",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Cartografia> capas = new HashSet<>();
    
    @ManyToOne
    @JoinColumn(name="ser_codcon")
    private Conexion conexion;

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
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return the proyecciones
     */
    public String getProyecciones() {
        return proyecciones;
    }

    /**
     * @param proyecciones the proyecciones to set
     */
    public void setProyecciones(String proyecciones) {
        this.proyecciones = proyecciones;
    }

    /**
     * @return the leyenda
     */
    public String getLeyenda() {
        return leyenda;
    }

    /**
     * @param leyenda the leyenda to set
     */
    public void setLeyenda(String leyenda) {
        this.leyenda = leyenda;
    }

    /**
     * @return the infoUrl
     */
    public String getInfoUrl() {
        return infoUrl;
    }

    /**
     * @param infoUrl the infoUrl to set
     */
    public void setInfoUrl(String infoUrl) {
        this.infoUrl = infoUrl;
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
     * @return the capas
     */
    public Set<Cartografia> getCapas() {
        return capas;
    }

    /**
     * @param capas the capas to set
     */
    public void setCapas(Set<Cartografia> capas) {
        this.capas = capas;
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
    
    
    
   
}