package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="stm_arbolnod")
public class TreeNode {

    //Códigos numéricos
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="arn_codigo")
    private long id;
    
    @Column(name="arn_nombre")
    private String name;
    
    @Column(name="arn_tooltip")
    private String tooltip;
    
    @Column(name="arn_orden")
    private Integer ordee;
    
    @Column(name="arn_activo")
    private Boolean active;
    
    @JoinColumn(name="arn_codpadre")
    @ManyToOne
    @JsonIgnore
    private TreeNode parent;    
    
    @JoinColumn(name="arn_codarb")
    @ManyToOne
    private Tree tree;    

    @JoinColumn(name="arb_codcar")
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