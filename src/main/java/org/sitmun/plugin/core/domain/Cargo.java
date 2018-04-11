package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="stm_cargo")
public class Cargo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="cgo_codigo")
    private long id;
    
    @Column(name="cgo_cargo")
    private String nombre;
    
    @Column(name="cgo_org")
    private String organizacion;
    
    @Column(name="cgo_correo")
    private String correo;
    
    @Column(name="cgo_f_alta")
    private Date fechaAlta;
    
    @Column(name="cgo_f_caduc")
    private Date fechaCaducidad;
    
    @ManyToOne
    @JoinColumn(name="cgo_codusu")
    @NotNull
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name="cgo_codter")
    @NotNull
    private Territorio territorio;

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
     * @return the organizacion
     */
    public String getOrganizacion() {
        return organizacion;
    }

    /**
     * @param organizacion the organizacion to set
     */
    public void setOrganizacion(String organizacion) {
        this.organizacion = organizacion;
    }

    /**
     * @return the correo
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * @param correo the correo to set
     */
    public void setCorreo(String correo) {
        this.correo = correo;
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
     * @return the fechaCaducidad
     */
    public Date getFechaCaducidad() {
        return fechaCaducidad;
    }

    /**
     * @param fechaCaducidad the fechaCaducidad to set
     */
    public void setFechaCaducidad(Date fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
    }

    /**
     * @return the usuario
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
}