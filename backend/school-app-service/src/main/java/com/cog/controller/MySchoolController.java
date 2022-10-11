package com.cog.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.cog.dto.ResponseDto;
import com.cog.dto.UserDto;
import com.cog.entity.Acknowledge;
import com.cog.entity.Circular;
import com.cog.entity.User;
import com.cog.service.CircularService;
import com.cog.service.UserService;

@RestController
@RequestMapping("/myschool")
@CrossOrigin
public class MySchoolController {
	private static final Logger LOGGER = LoggerFactory.getLogger(MySchoolController.class);
	@Autowired
	UserService userService;
	@Autowired
	CircularService circularService;

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") Integer id) {
		LOGGER.info("getUser");
		return new ResponseEntity<>(userService.findByUserId(id), HttpStatus.ACCEPTED);
	}

	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody UserDto userDto) {
		LOGGER.info("updateUser");
		return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.ACCEPTED);
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		LOGGER.info("getAllUsers");
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.ACCEPTED);
	}

	@PutMapping("/accept/{status}")
	public ResponseEntity<ResponseDto> acceptOrRejectUser(@RequestBody UserDto userDto,
			@PathVariable("status") String status) {
		LOGGER.info("acceptOrRejectUser");
		return new ResponseEntity<>(userService.acceptOrRejectUser(userDto.getId(), status,userDto), HttpStatus.ACCEPTED);
	}
	@GetMapping("/allCirculars/{email}")
	public ResponseEntity<List<Circular>> getAllCirculars(@PathVariable("email")String email){
		LOGGER.info("getAllCirculars");
		return new ResponseEntity<>(circularService.getAllCirculars(email), HttpStatus.ACCEPTED);

		
	}
	@PostMapping("/createCircular/{email}")
	public ResponseEntity<List<Circular>> createCircular(@Valid @RequestBody Circular circular,@PathVariable("email")String email){
		LOGGER.info("createCircular");
		circularService.createCircular(circular);
		return getAllCirculars(email);

		
	}
	@PostMapping("/acknowledge/{circularId}")
	public ResponseEntity<ResponseDto> createAcknowledge(@RequestBody Acknowledge acknowledge,@PathVariable("circularId") Integer circularId ){
		LOGGER.info("createAcknowledge");
		return	new ResponseEntity<>(circularService.createAcknowledge(acknowledge,circularId),HttpStatus.OK);
		 

		
	}
	@GetMapping("/allacknowledge")
	public ResponseEntity<List<Acknowledge>> getAllAcknowledges(){
		return new ResponseEntity<>(circularService.getAllAcknowledges(),HttpStatus.OK);
	}
}
