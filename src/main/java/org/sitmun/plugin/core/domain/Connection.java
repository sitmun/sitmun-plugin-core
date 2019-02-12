package org.sitmun.plugin.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "stm_conexion")
public class Connection {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "con_codigo")
	private long id;

	@Column(name = "con_nombre", length = 80)
	private String name;

	@Column(name = "con_driver", length = 50)
	private String type;

	@Column(name = "con_usuario", length = 50)
	private String user;

	@Column(name = "con_password", length = 50)
	private String password;

	@Column(name = "con_constring", length = 250)
	private String connectionString;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConnectionString() {
		return connectionString;
	}

	public void setConnectionString(String connectionString) {
		this.connectionString = connectionString;
	}

}