package com.cog.entity;



import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;



import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Acknowledge {
	@Id
	@SequenceGenerator(name = "acknowledge", sequenceName = "acknowledge_sequence",initialValue = 1,allocationSize = 1)
	@GeneratedValue(generator = "acknowledge", strategy = GenerationType.SEQUENCE)
	Integer id;
	String email;
	LocalDate acknowledgeDate;
	@ManyToOne(targetEntity = Circular.class)
	@JoinColumn(name = "circular_id",referencedColumnName = "id")
	Circular circular;
}
