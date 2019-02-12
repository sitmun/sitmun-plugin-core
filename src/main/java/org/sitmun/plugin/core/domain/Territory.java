package org.sitmun.plugin.core.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_eterrit")
public class Territory {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "ter_codigo")
	private long id;

	@NotNull
	@Column(name = "ter_nombre", unique = true, nullable = false, length = 250)
	private String name;

	@Column(name = "ter_correo", length = 250)
	private String email;

	@Column(name = "ter_direcc", length = 250)
	private String address;

	@Column(name = "ter_nadmin", length = 250)
	private String organizationName;

	@Column(name = "ter_ambito", length = 250)
	private String scope;

	@Column(name = "ter_logo", length = 250)
	private String logo;

	@Column(name = "ter_ext", length = 250)
	private String ext;

	@Column(name = "ter_bloq")
	private Boolean blocked;

	@Column(name = "ter_observ", length = 250)
	private String comments;

	@Column(name = "ter_f_alta")
	private Date createdDate;

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "stm_grpter", joinColumns = @JoinColumn(name = "grt_codter",foreignKey=@ForeignKey(name = "STM_GRT_FK_TER")), inverseJoinColumns = @JoinColumn(name = "grt_codterm",foreignKey=@ForeignKey(name = "STM_GRT_FK_TERM")))
	private Set<Territory> members = new HashSet<>();

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "stm_grpter", joinColumns = @JoinColumn(name = "grt_codterm",foreignKey=@ForeignKey(name = "STM_GRT_FK_TERM")), inverseJoinColumns = @JoinColumn(name = "grt_codter",foreignKey=@ForeignKey(name = "STM_GRT_FK_TER")))
	private Set<Territory> memberOf = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "ter_codtgr",foreignKey=@ForeignKey(name = "STM_TER_FK_TGR"))
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

	@Override
	public boolean equals(Object o) {
		if ((o != null) && (o instanceof Territory)) {
			return ((Territory) o).getId() == this.getId();
		}
		return false;
	}

	@Override
	public int hashCode() {
		return super.hashCode();
	}

}