package org.sitmun.plugin.core.domain;

import javax.persistence.*;

@Entity
@Table(name="stm_conexion")
public class Conexion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="con_codigo")
    private long id;
    
    @Column(name="con_nombre")
    private String nombre;
    

    @Column(name="con_driver")
    private String type;
    
    @Column(name="con_usuario")
    private String usuario;
    
    @Column(name="con_password")
    private String password;
    
    @Column(name="con_constring")
    private String cadenaConexion;

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
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the usuario
     */
    public String getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the cadenaConexion
     */
    public String getCadenaConexion() {
        return cadenaConexion;
    }

    /**
     * @param cadenaConexion the cadenaConexion to set
     */
    public void setCadenaConexion(String cadenaConexion) {
        this.cadenaConexion = cadenaConexion;
    }
    
    
}