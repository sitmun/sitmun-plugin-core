package org.sitmun.plugin.core.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="stm_disptarea", uniqueConstraints={
        @UniqueConstraint(columnNames={"dta_codter", "dta_codtar"})
     })
public class TaskAvailability {

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

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="dta_codigo")
    private long id;

    @Column(name="dta_f_alta")
    private Date createdDate;    
    
    @ManyToOne
    @JoinColumn(name="dta_codter")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Territory territory;    
    
    @ManyToOne
    @JoinColumn(name="dta_codtar")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Task task;

    }