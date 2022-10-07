package com.cog.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserStaffDto {
	@NotBlank(message = "Email Id cannot be Empty")
	private String emailId;

	@NotBlank(message = "Password cannot be Empty")
	private String password;
}
