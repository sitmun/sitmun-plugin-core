
package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "stm_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "usu_codigo")
    private long id;

    @Column(name = "usu_usuario")
    private String username;

    @Column(name = "usu_pass")
    private String password;

    @Column(name = "usu_nombre")
    private String nombre;

    @Column(name = "usu_apellido")
    private String apellido;

    @Column(name = "usu_adm")
    private Boolean administrador;

    @Column(name = "usu_bloq")
    private Boolean bloqueado;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Cargo> cargos = new HashSet<>();

    // permisos
    //En la pestaña Permisos se definen los roles del usuario para un
    // territorio particular. Esta acción se realiza en dos pasos. El primero
    // paso es escoger un territorio y el segundo asignar los roles para este
    // usuario y territorio.
    @OneToMany(mappedBy="usuario", cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<ConfiguracionUsuario> permisos = new HashSet<>();

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
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
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
     * @return the apellido
     */
    public String getApellido() {
        return apellido;
    }

    /**
     * @param apellido the apellido to set
     */
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    /**
     * @return the administrador
     */
    public Boolean getAdministrador() {
        return administrador;
    }

    /**
     * @param administrador the administrador to set
     */
    public void setAdministrador(Boolean administrador) {
        this.administrador = administrador;
    }

    /**
     * @return the bloqueado
     */
    public Boolean getBloqueado() {
        return bloqueado;
    }

    /**
     * @param bloqueado the bloqueado to set
     */
    public void setBloqueado(Boolean bloqueado) {
        this.bloqueado = bloqueado;
    }

    /**
     * @return the cargos
     */
    public Set<Cargo> getCargos() {
        return cargos;
    }

    /**
     * @param cargos the cargos to set
     */
    public void setCargos(Set<Cargo> cargos) {
        this.cargos = cargos;
    }

    /**
     * @return the permisos
     */
    public Set<ConfiguracionUsuario> getPermisos() {
        return permisos;
    }

    /**
     * @param permisos the permisos to set
     */
    public void setPermisos(Set<ConfiguracionUsuario> permisos) {
        this.permisos = permisos;
    }
    

}
