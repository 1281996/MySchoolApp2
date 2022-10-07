package com.cog.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
	@Id
	@SequenceGenerator(name = "user", sequenceName = "user_sequence", initialValue = 1, allocationSize = 1)
	@GeneratedValue(generator = "user", strategy = GenerationType.SEQUENCE)
	private Integer id;

	@Column(name = "email_id")
	private String emailId;

	@Column(name = "password")
	private String password;
	
	@Column(name = "parent_name")
	private String parentName;
	
	@Column(name = "student_name")
	private String studentName;
	
	@Column(name = "student_regno")
	private String studentRegNo;
	
	private String address;
	
	private String country;
	
	private String state;
	
	private String city;
	
	@Column(name = "zip_code")
	private Integer zipCode;
	
	@Column(name = "primary_contact_name")
	private String  primaryContactName;
	
	@Column(name = "primary_contact_phoneno")
	private Long primaryContactPhoneNo;
	
	@Column(name = "secondary_contact_name")
	private String secondaryContactName;
	
	@Column(name = "secondary_contact_phoneno")
	private Long secondaryContactPhoneNo;

	@Column(name = "registered_date")
	private LocalDate registeredDate=LocalDate.now();
	
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	
	private Integer age;
	
	@Column(name = "reg_no")
	private Long regNo;
	
	private String status;
	
	private String comment;
}
