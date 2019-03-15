package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Table(name = "STM_LOG")
public class Log {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STM_GENERATOR")
  @SequenceGenerator(name = "STM_GENERATOR", sequenceName = "STM_SEQ")
  @Column(name = "LOG_CODIGO", precision = 11)
  private BigInteger id;

  @Column(name = "LOG_TIPO", length = 50)
  private String nombre;

  @Column(name = "LOG_CODUSU")
  private String codigoUsuario;

  @Column(name = "LOG_CODAPP")
  private String codigoAplicacion;

  @Column(name = "LOG_CODTER")
  private String codigoTerritorio;

  @Column(name = "LOG_CODTAR")
  private String codigoTarea;

  @Column(name = "LOG_FECHA")
  @Temporal(TemporalType.TIMESTAMP)
  private Date fecha;

  //TODO log_cont es el identificador del log?
  @Column(name = "LOG_CONT", precision = 11)
  private long cont;


  /**
   * @return the id
   */
  public BigInteger getId() {
    return id;
  }

  /**
   * @param id the id to set
   */
  public void setId(BigInteger id) {
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

  public long getCont() {
    return cont;
  }

  public void setCont(long cont) {
    this.cont = cont;
  }

}