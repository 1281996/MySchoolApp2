package com.cog.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cog.dto.JwtResponse;
import com.cog.dto.LoginDto;

import com.cog.dto.UserDto;
import com.cog.dto.UserStaffDto;
import com.cog.jwt.JwtUtils;

import com.cog.service.UserDetailsImpl;
import com.cog.service.UserMappingService;
import com.cog.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthorController extends BaseContoller {
	@Autowired
	UserService userService;

	@Autowired
	UserMappingService userMappingService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtils jwtUtils;

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthorController.class);

	@PostMapping(path = "/signup")
	ResponseEntity<Long> createParentUser(@Valid @RequestBody UserDto signupDto) {
		LOGGER.info("createUser");
		return new ResponseEntity<>(userService.saveUser(signupDto), HttpStatus.OK);
	}
	@PostMapping(path = "/signupStaff")
	ResponseEntity<Long> createStaffUser(@Valid @RequestBody UserStaffDto signupDto) {
		LOGGER.info("createUser");
		return new ResponseEntity<>(userService.saveSatffUser(signupDto), HttpStatus.OK);
	}


	@PostMapping(path = "/login")
	ResponseEntity<JwtResponse> loginUser(@Valid @RequestBody LoginDto loginDto) {
		LOGGER.info("loginUser");
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmailId(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(),

				userDetails.getEmail(), roles));

	}

}
