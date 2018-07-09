package org.sitmun.plugin.core.service.dto;

import org.sitmun.plugin.core.domain.User;
import org.springframework.hateoas.Identifiable;
import org.springframework.hateoas.core.Relation;

@Relation(value = "user", collectionRelation = "users")
public class UserDTO implements Identifiable<Long> {

  private Long id;
  private String username;
  private String firstName;
  private String lastName;
  private Boolean administrator;
  private Boolean blocked;

  public UserDTO() {
    super();
    // TODO Auto-generated constructor stub
  }

  public UserDTO(User user) {
    this.id = user.getId();

    this.username = user.getUsername();

    this.firstName = user.getFirstName();

    this.lastName = user.getLastName();

    this.administrator = user.getAdministrator();

    this.blocked = user.getBlocked();
/*
		this.positions = user.getPositions();

		this.permissions = user.getPermissions();
		*/
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
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
	/*

	private Set<UserPosition> positions = new HashSet<>();

	private Set<UserConfiguration> permissions = new HashSet<>();
	*/

}
