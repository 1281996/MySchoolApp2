package com.cog.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto extends UserStaffDto {
	private Integer id;

    @NotBlank(message = "Parent Name cannot be Empty")
	private String parentName;

	@NotBlank(message = "StudentName  cannot be Empty")
	private String studentName;

	@NotBlank(message = "StudentRegNo  cannot be Empty")
	private String studentRegNo;

	@NotBlank(message = "Address  cannot be Empty")
	private String address;

	@NotBlank(message = "Country  cannot be Empty")
	private String country;

	@NotBlank(message = "State  cannot be Empty")
	private String state;

	@NotBlank(message = "City  cannot be Empty")
	private String city;

	@NotNull(message = "ZipCode  cannot be Empty")
	private Integer zipCode;

	@NotBlank(message = "PrimaryContactName  cannot be Empty")
	private String primaryContactName;

	@NotNull(message = "PrimaryContactPhoneNo  cannot be Empty")
	private Long primaryContactPhoneNo;

	@NotBlank(message = "SecondaryContactName  cannot be Empty")
	private String secondaryContactName;

	@NotNull(message = "SecondaryContactPhoneNo  cannot be Empty")
	private Long secondaryContactPhoneNo;

	@NotNull(message = "DateOfBirth  cannot be Empty")
	private LocalDate dateOfBirth;

	@NotNull(message = "Age  cannot be Empty")
	private Integer age;
	
	private String comment;
}
