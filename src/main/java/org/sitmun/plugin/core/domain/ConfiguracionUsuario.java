package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_usuconf",uniqueConstraints={
        @UniqueConstraint(columnNames={"ucf_codusu", "ucf_codter","ucf_codrol"})
     })
public class ConfiguracionUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ucf_codigo")
    private long id;

    @JoinColumn(name="ucf_codusu")
    @ManyToOne
    //@OnDelete(action = OnDeleteAction.CASCADE)
    private Usuario usuario;
    
    @ManyToOne
    //@MapsId("territorioId")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="ucf_codter")
    private Territorio territorio;
    
    //De momento un usuario puede tener sólo un rol en un territorio (N-1)?
    @ManyToOne
    //@OnDelete(action = OnDeleteAction.CASCADE)
    //@MapsId("rolId")
    @JoinColumn(name="ucf_codrol")
    private Rol rol;

   

    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * @return the usuario
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
     * @return the rol
     */
    public Rol getRol() {
        return rol;
    }

    /**
     * @param rol the rol to set
     */
    public void setRol(Rol rol) {
        this.rol = rol;
    }
}