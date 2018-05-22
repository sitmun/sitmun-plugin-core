package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="stm_fondo")
public class Background {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="fon_codigo")
    private long id;
    
    @Column(name="fon_nombre")
    private String name;
    
    @Column(name="fon_desc")
    private String description;
    
    
    @Column(name="fon_activo")
    private Boolean active;
    
    @Column(name="fon_f_alta")
    private Date createdDate;
    
    @ManyToOne
    @JoinColumn(name="fon_codcga")
    @NotNull
    private CartographyGroup cartographyGroup;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public CartographyGroup getCartographyGroup() {
		return cartographyGroup;
	}

	public void setCartographyGroup(CartographyGroup cartographyGroup) {
		this.cartographyGroup = cartographyGroup;
	}

  
}