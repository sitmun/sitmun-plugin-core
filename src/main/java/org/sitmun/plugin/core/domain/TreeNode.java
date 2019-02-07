package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

@Entity
@Table(name = "stm_arbolnod")
public class TreeNode {

	// Códigos numéricos
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stm_generator")
	@SequenceGenerator(name = "stm_generator", sequenceName = "stm_seq")
	@Column(name = "anr_codigo")
	private long id;

	@Column(name = "arn_nombre", length = 80)
	private String name;

	@Column(name = "arn_tooltip", length = 100)
	private String tooltip;

	@Column(name = "arn_orden")
	private Integer ordee;

	@Column(name = "arn_activo")
	private Boolean active;

	@JoinColumn(name = "arn_codpadre",foreignKey=@ForeignKey(name = "STM_ARN_FK_PADRE"))
	@ManyToOne
	@JsonIgnore
	private TreeNode parent;

	@JoinColumn(name = "arn_codarb",foreignKey=@ForeignKey(name = "STM_ARN_FK_ARB"))
	@ManyToOne
	private Tree tree;

	@JoinColumn(name = "arn_codcar",foreignKey=@ForeignKey(name = "STM_ARN_FK_CAR"))
	@ManyToOne
	private Cartography cartography;

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

	public String getTooltip() {
		return tooltip;
	}

	public void setTooltip(String tooltip) {
		this.tooltip = tooltip;
	}

	public Integer getOrdee() {
		return ordee;
	}

	public void setOrdee(Integer ordee) {
		this.ordee = ordee;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public TreeNode getParent() {
		return parent;
	}

	public void setParent(TreeNode parent) {
		this.parent = parent;
	}

	public Tree getTree() {
		return tree;
	}

	public void setTree(Tree tree) {
		this.tree = tree;
	}

	public Cartography getCartography() {
		return cartography;
	}

	public void setCartography(Cartography cartography) {
		this.cartography = cartography;
	}

}