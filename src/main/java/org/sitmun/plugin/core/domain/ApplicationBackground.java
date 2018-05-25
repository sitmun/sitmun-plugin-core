package org.sitmun.plugin.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="stm_appfon",uniqueConstraints={
        @UniqueConstraint(columnNames={"apf_codapp", "apf_codfon"})
     })
public class ApplicationBackground {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="apf_orden")
    private Integer order;
    
    
    @ManyToOne
    @JoinColumn(name="apf_codapp")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    @JsonIgnore
    private Application application;
    
    @ManyToOne
    @JoinColumn(name="apf_codfon")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Background background;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public Background getBackground() {
		return background;
	}

	public void setBackground(Background background) {
		this.background = background;
	}
    
   


    
}