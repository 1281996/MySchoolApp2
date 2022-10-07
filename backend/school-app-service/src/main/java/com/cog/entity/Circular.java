package com.cog.entity;



import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Circular {
	@Id
	@SequenceGenerator(name = "circular", sequenceName = "circular_sequence",initialValue = 1,allocationSize = 1)
	@GeneratedValue(generator = "circular", strategy = GenerationType.SEQUENCE)
	Integer id;
	@NotNull(message = "Notification Date is Required")
	LocalDate notificationDate;
	@NotBlank(message = "information Date is Required")
	String information;
	@NotBlank(message = "postedBy Date is Required")
	String postedBy;
	
	
	
}
