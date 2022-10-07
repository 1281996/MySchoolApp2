package com.cog.entity;

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
public class Role {
	@Id
	@SequenceGenerator(name = "role", sequenceName = "role_sequence")
	@GeneratedValue(generator = "role", strategy = GenerationType.SEQUENCE)
	private Integer id;

	@Column(name = "role_name")
	private String roleName;

}
