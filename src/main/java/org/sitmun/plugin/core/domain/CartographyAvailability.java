package org.sitmun.plugin.core.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "stm_dispcarto", uniqueConstraints = { @UniqueConstraint(columnNames = { "dca_codter", "dca_codcar" }) })
public class CartographyAvailability {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "dca_codigo")
	private long id;

	@Column(name = "dca_f_alta")
	private Date createdDate;

	@ManyToOne
	// @MapsId("territorioId")
	@JoinColumn(name = "dca_codter",foreignKey=@ForeignKey(name = "STM_DCA_FK_TER"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Territory territory;

	@ManyToOne
	// @MapsId("cartografiaId")
	@JoinColumn(name = "dca_codcar",foreignKey=@ForeignKey(name = "STM_DCA_FK_CAR"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Cartography cartography;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Territory getTerritory() {
		return territory;
	}

	public void setTerritory(Territory territory) {
		this.territory = territory;
	}

	public Cartography getCartography() {
		return cartography;
	}

	public void setCartography(Cartography cartography) {
		this.cartography = cartography;
	}

	public String toString() {
		return "Cartography=" + this.cartography.getId() + ",Territorio=" + this.territory.getId() + "fechaAlta="
				+ this.createdDate;
	}

}