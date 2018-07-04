package org.sitmun.plugin.core.service.dto;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.domain.UserConfiguration;
import org.sitmun.plugin.core.domain.UserPosition;

public class UserDTO {

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public UserDTO(User user) {
		this.id = user.getId();

		this.username = user.getUsername();

		this.firstName = user.getFirstName();

		this.lastName = user.getLastName();

		this.administrator = user.getAdministrator();

		this.blocked = user.getBlocked();

		this.positions = user.getPositions();

		this.permissions = user.getPermissions();
	}

	private long id;

	private String username;

	private String firstName;

	private String lastName;

	private Boolean administrator;

	private Boolean blocked;

	private Set<UserPosition> positions = new HashSet<>();

	private Set<UserConfiguration> permissions = new HashSet<>();

}
