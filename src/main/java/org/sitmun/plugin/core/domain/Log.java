package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="stm_log")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="log_codigo")
    private long id;
    
    @Column(name="log_tipo")
    private String nombre;
    
    @Column(name="log_codusu")
    private String codigoUsuario;
    
    @Column(name="log_codapp")
    private String codigoAplicacion;

    @Column(name="log_codter")
    private String codigoTerritorio;
    
    @Column(name="log_codtar")
    private String codigoTarea;

    @Column(name="log_cont")
    private String contenido;
    
    @Column(name="dca_f_ult")
    private Date fecha;

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
     * @return the codigoUsuario
     */
    public String getCodigoUsuario() {
        return codigoUsuario;
    }

    /**
     * @param codigoUsuario the codigoUsuario to set
     */
    public void setCodigoUsuario(String codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    /**
     * @return the codigoAplicacion
     */
    public String getCodigoAplicacion() {
        return codigoAplicacion;
    }

    /**
     * @param codigoAplicacion the codigoAplicacion to set
     */
    public void setCodigoAplicacion(String codigoAplicacion) {
        this.codigoAplicacion = codigoAplicacion;
    }

    /**
     * @return the codigoTerritorio
     */
    public String getCodigoTerritorio() {
        return codigoTerritorio;
    }

    /**
     * @param codigoTerritorio the codigoTerritorio to set
     */
    public void setCodigoTerritorio(String codigoTerritorio) {
        this.codigoTerritorio = codigoTerritorio;
    }

    /**
     * @return the codigoTarea
     */
    public String getCodigoTarea() {
        return codigoTarea;
    }

    /**
     * @param codigoTarea the codigoTarea to set
     */
    public void setCodigoTarea(String codigoTarea) {
        this.codigoTarea = codigoTarea;
    }

    /**
     * @return the contenido
     */
    public String getContenido() {
        return contenido;
    }

    /**
     * @param contenido the contenido to set
     */
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    /**
     * @return the fecha
     */
    public Date getFecha() {
        return fecha;
    }

    /**
     * @param fecha the fecha to set
     */
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
    
}