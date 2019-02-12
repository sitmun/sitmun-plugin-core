package org.sitmun.plugin.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "stm_log")
public class Log {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "log_codigo")
	private long id;

	@Column(name = "log_tipo", length = 50)
	private String nombre;

	@Column(name = "log_codusu")
	private String codigoUsuario;

	@Column(name = "log_codapp")
	private String codigoAplicacion;

	@Column(name = "log_codter")
	private String codigoTerritorio;

	@Column(name = "log_codtar")
	private String codigoTarea;

	@Column(name = "log_fecha")
	private Date fecha;
	
	//TODO log_cont es el identificador del log?
	@Column(name = "log_cont", precision = 11)
	private long cont;



	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
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
	 * @param nombre
	 *            the nombre to set
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
	 * @param codigoUsuario
	 *            the codigoUsuario to set
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
	 * @param codigoAplicacion
	 *            the codigoAplicacion to set
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
	 * @param codigoTerritorio
	 *            the codigoTerritorio to set
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
	 * @param codigoTarea
	 *            the codigoTarea to set
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
	 * @param fecha
	 *            the fecha to set
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