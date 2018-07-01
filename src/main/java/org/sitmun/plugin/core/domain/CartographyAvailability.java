package org.sitmun.plugin.core.domain;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="stm_dispcarto",uniqueConstraints={
        @UniqueConstraint(columnNames={"dca_codter", "dca_codcar"})
     })
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CartographyAvailability {

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    
    @Column(name="dca_f_alta")
    private Date createdDate;
    
    
    @ManyToOne
    //@MapsId("territorioId")
    @JoinColumn(name="dca_codter")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Territory territory;
    
    @ManyToOne
    //@MapsId("cartografiaId")    
    @JoinColumn(name="dca_codcar")
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
        return "Cartography="+this.cartography.getId()+",Territorio="+this.territory.getId()+"fechaAlta="+this.createdDate;
    }
    
}