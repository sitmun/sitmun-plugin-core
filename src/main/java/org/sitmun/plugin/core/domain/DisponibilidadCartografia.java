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
public class DisponibilidadCartografia {

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    
    @Column(name="dca_f_alta")
    private Date fechaAlta;
    
    
    @ManyToOne
    //@MapsId("territorioId")
    @JoinColumn(name="dca_codter")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Territorio territorio;
    
    @ManyToOne
    //@MapsId("cartografiaId")    
    @JoinColumn(name="dca_codcar")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Cartografia cartografia;
    
    

    /**
     * @return the fechaAlta
     */
    public Date getFechaAlta() {
        return fechaAlta;
    }

    /**
     * @param fechaAlta the fechaAlta to set
     */
    public void setFechaAlta(Date fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    /**
     * @return the territorio
     */
    public Territorio getTerritorio() {
        return territorio;
    }

    /**
     * @param territorio the territorio to set
     */
    public void setTerritorio(Territorio territorio) {
        this.territorio = territorio;
    }

    /**
     * @return the cartografia
     */
    public Cartografia getCartografia() {
        return cartografia;
    }

    /**
     * @param cartografia the cartografia to set
     */
    public void setCartografia(Cartografia cartografia) {
        this.cartografia = cartografia;
    }
    
    public String toString() {
        return "Cartografía="+this.cartografia.getId()+",Territorio="+this.territorio.getId()+"fechaAlta="+this.fechaAlta;
    }
    
}