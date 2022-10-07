package com.cog.entity;

import javax.persistence.CascadeType;
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
public class UserMapping {
	@Id
	@SequenceGenerator(name = "mapping", sequenceName = "user_mapping_sequence")
	@GeneratedValue(generator = "mapping", strategy = GenerationType.SEQUENCE)
	private Integer id;

	@ManyToOne(targetEntity = User.class, cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@ManyToOne(targetEntity = Role.class, cascade = CascadeType.MERGE)
	@JoinColumn(name = "role_id", referencedColumnName = "id")
	private Role role;

}
