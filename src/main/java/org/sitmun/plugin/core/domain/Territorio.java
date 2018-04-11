package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="stm_territorio")
public class Territorio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ter_codigo")
    private long id;
    
    @Column(name="ter_nombre")
    private String nombre;
    
    @Column(name="ter_correo")
    private String email;
    
    @Column(name="ter_direcc")
    private String direccion;
    

    @Column(name="ter_nadmin")
    private String nombreAdministracion;
    
    @Column(name="ter_ambito")
    private String ambito;
    
    @Column(name="ter_logo")
    private String logo;
    
    @Column(name="ter_ext")
    private String ext;
    
    @Column(name="ter_bloq")
    private Boolean bloqueado;
    
    @Column(name="ter_observ")
    private String observaciones;
    
    @Column(name="ter_f_alta")
    private Date fechaAlta;    
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "stm_grpter", joinColumns = @JoinColumn(name = "grt_codter"), inverseJoinColumns = @JoinColumn(name = "grt_codterm"))            
    private Set<Territorio> miembros;    
    
    @ManyToOne
    @JoinColumn(name="ter_codtgr")
    private TipoTerritorio tipo;

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
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the direccion
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * @param direccion the direccion to set
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * @return the nombreAdministracion
     */
    public String getNombreAdministracion() {
        return nombreAdministracion;
    }

    /**
     * @param nombreAdministracion the nombreAdministracion to set
     */
    public void setNombreAdministracion(String nombreAdministracion) {
        this.nombreAdministracion = nombreAdministracion;
    }

    /**
     * @return the ambito
     */
    public String getAmbito() {
        return ambito;
    }

    /**
     * @param ambito the ambito to set
     */
    public void setAmbito(String ambito) {
        this.ambito = ambito;
    }

    /**
     * @return the logo
     */
    public String getLogo() {
        return logo;
    }

    /**
     * @param logo the logo to set
     */
    public void setLogo(String logo) {
        this.logo = logo;
    }

    /**
     * @return the ext
     */
    public String getExt() {
        return ext;
    }

    /**
     * @param ext the ext to set
     */
    public void setExt(String ext) {
        this.ext = ext;
    }

    /**
     * @return the bloqueado
     */
    public Boolean getBloqueado() {
        return bloqueado;
    }

    /**
     * @param bloqueado the bloqueado to set
     */
    public void setBloqueado(Boolean bloqueado) {
        this.bloqueado = bloqueado;
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
     * @return the miembros
     */
    public Set<Territorio> getMiembros() {
        return miembros;
    }

    /**
     * @param miembros the miembros to set
     */
    public void setMiembros(Set<Territorio> miembros) {
        this.miembros = miembros;
    }

    /**
     * @return the tipo
     */
    public TipoTerritorio getTipo() {
        return tipo;
    }

    /**
     * @param tipo the tipo to set
     */
    public void setTipo(TipoTerritorio tipo) {
        this.tipo = tipo;
    }    
    
    
}