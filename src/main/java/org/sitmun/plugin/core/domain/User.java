package org.sitmun.plugin.core.domain;

import org.springframework.hateoas.Identifiable;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_usuario")
public class User implements Identifiable<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "usu_codigo")
	private long id;

	@NotNull
	@Column(name = "usu_usuario", unique = true, nullable = false, length = 30)
	private String username;

	@Column(name = "usu_password", length = 128)
	private String password;

	@Column(name = "usu_nombre", length = 30)
	private String firstName;

	@Column(name = "usu_apellidos", length = 40)
	private String lastName;

	@Column(name = "usu_adm")
	private Boolean administrator;

	@Column(name = "usu_bloq")
	private Boolean blocked;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<UserPosition> positions = new HashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<UserConfiguration> permissions = new HashSet<>();

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Boolean getAdministrator() {
		return administrator;
	}

	public void setAdministrator(Boolean administrator) {
		this.administrator = administrator;
	}

	public Boolean getBlocked() {
		return blocked;
	}

	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}

	public Set<UserPosition> getPositions() {
		return positions;
	}

	public void setPositions(Set<UserPosition> positions) {
		this.positions = positions;
	}

	public Set<UserConfiguration> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<UserConfiguration> permissions) {
		this.permissions = permissions;
	}

}
