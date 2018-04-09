package org.sitmun.plugin.core.domain;

import java.util.Date;
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
@Table(name="stm_apps")
public class Aplicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="app_codigo")
    private long id;
    
    @Column(name="app_nombre")
    private String nombre;
    
    

    @Column(name="app_tipo")
    private String tipo;
    
    
    @Column(name="app_titulo")
    private String titulo;
    
    @Column(name="app_tema")
    private String tema;
    
    @Column(name="app_f_alta")
    private Date fechaAlta;
    
    //la relación entre Aplicacion y Rol es de momento 1-N 
    @OneToMany(mappedBy="aplicacion",cascade = CascadeType.ALL)
    private Set<Rol> rolesDisponibles;
    
    @ManyToOne
    @JoinColumn(name="cod_arb")
    private Arbol arbol;
    
    //Escalas (Integer) separados por comas
    @Column(name="app_escalas")
    private String escalas;
    
    //Códigos EPSG (String) separados por comas
    @Column(name="app_project")
    private String proyecciones;
    
    //Refrescar automáticamente el árbol:
    @Column(name="app_autorefr")
    private Boolean autoRefrescoArbol;
    
    
    //fondos base de mapea con la entidad FondoAplicacion
    @OneToMany(mappedBy="aplicacion",cascade = CascadeType.ALL)
    private Set<FondoAplicacion> fondos;
    
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
     * @return the titulo
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * @param titulo the titulo to set
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * @return the tema
     */
    public String getTema() {
        return tema;
    }

    /**
     * @param tema the tema to set
     */
    public void setTema(String tema) {
        this.tema = tema;
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
     * @return the rolesDisponibles
     */
    public Set<Rol> getRolesDisponibles() {
        return rolesDisponibles;
    }

    /**
     * @param rolesDisponibles the rolesDisponibles to set
     */
    public void setRolesDisponibles(Set<Rol> rolesDisponibles) {
        this.rolesDisponibles = rolesDisponibles;
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
     * @return the escalas
     */
    public String getEscalas() {
        return escalas;
    }

    /**
     * @param escalas the escalas to set
     */
    public void setEscalas(String escalas) {
        this.escalas = escalas;
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
     * @return the autoRefrescoArbol
     */
    public Boolean getAutoRefrescoArbol() {
        return autoRefrescoArbol;
    }

    /**
     * @param autoRefrescoArbol the autoRefrescoArbol to set
     */
    public void setAutoRefrescoArbol(Boolean autoRefrescoArbol) {
        this.autoRefrescoArbol = autoRefrescoArbol;
    }

    /**
     * @return the fondos
     */
    public Set<FondoAplicacion> getFondos() {
        return fondos;
    }

    /**
     * @param fondos the fondos to set
     */
    public void setFondos(Set<FondoAplicacion> fondos) {
        this.fondos = fondos;
    }

    /**
     * @return the mapaSituacion
     */
    public GrupoCartografia getMapaSituacion() {
        return mapaSituacion;
    }

    /**
     * @param mapaSituacion the mapaSituacion to set
     */
    public void setMapaSituacion(GrupoCartografia mapaSituacion) {
        this.mapaSituacion = mapaSituacion;
    }

    /**
     * @return the parametros
     */
    public Set<ParametroAplicacion> getParametros() {
        return parametros;
    }

    /**
     * @param parametros the parametros to set
     */
    public void setParametros(Set<ParametroAplicacion> parametros) {
        this.parametros = parametros;
    }

    //Mapa se situación
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="cod_gca")
    private GrupoCartografia mapaSituacion;
    
    @OneToMany(mappedBy="aplicacion",cascade = CascadeType.ALL)
    private Set<ParametroAplicacion> parametros;
    

}