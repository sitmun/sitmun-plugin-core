package org.sitmun.plugin.core.domain;

import javax.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "stm_territorio")
public class Territory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ter_codigo")
	private long id;

	@Column(name = "ter_nombre")
	private String name;

	@Column(name = "ter_correo")
	private String email;

	@Column(name = "ter_direcc")
	private String address;

	@Column(name = "ter_nadmin")
	private String organizationName;

	@Column(name = "ter_ambito")
	private String scope;

	@Column(name = "ter_logo")
	private String logo;

	@Column(name = "ter_ext")
	private String ext;

	@Column(name = "ter_bloq")
	private Boolean blocked;

	@Column(name = "ter_observ")
	private String comments;

	@Column(name = "ter_f_alta")
	private Date createdDate;

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "stm_grpter", joinColumns = @JoinColumn(name = "grt_codter"), inverseJoinColumns = @JoinColumn(name = "grt_codterm"))
	private Set<Territory> members = new HashSet<>();

	@ManyToMany( cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "stm_grpter", joinColumns = @JoinColumn(name = "grt_codterm"), inverseJoinColumns = @JoinColumn(name = "grt_codter"))
	private Set<Territory> memberOf = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "ter_codtgr")
	private TerritoryType type;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public Boolean getBlocked() {
		return blocked;
	}

	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Set<Territory> getMembers() {
		return members;
	}

	public void setMembers(Set<Territory> members) {
		this.members = members;
	}

	public Set<Territory> getMemberOf() {
		return memberOf;
	}

	public void setMemberOf(Set<Territory> memberOf) {
		this.memberOf = memberOf;
	}

	public TerritoryType getType() {
		return type;
	}

	public void setType(TerritoryType type) {
		this.type = type;
	}

}