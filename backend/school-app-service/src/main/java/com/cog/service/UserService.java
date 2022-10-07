package com.cog.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cog.dto.ResponseDto;
import com.cog.dto.UserDto;
import com.cog.dto.UserStaffDto;
import com.cog.entity.Role;
import com.cog.entity.User;
import com.cog.entity.UserMapping;
import com.cog.repository.UserRepository;
import com.cog.util.Constant;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserMappingService userMappingService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	public Long saveUser(UserDto userDto) {
		LOGGER.info("saveUser");
		// check if alrady user exists
		User userDb = userRepository.findByEmailId(userDto.getEmailId());
		if (userDb != null) {
			return userDb.getRegNo();
		}
		User user = setUserData(userDto, new User());
		// save User
		User userRes = userRepository.save(user);
		// mapping
		if (userRes.getId() != null) {
			Role role = roleService.findById(Constant.ROLE_PARENT_ID);
			userMappingService.createMapping(userRes, role);

		}

		return userRes.getRegNo();
	}

	private User setUserData(UserDto userDto, User user) {
		user.setEmailId(userDto.getEmailId());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setRegisteredDate(LocalDate.now());
		user.setAddress(userDto.getAddress());
		user.setAge(userDto.getAge());
		user.setCity(userDto.getCity());
		user.setCountry(userDto.getCountry());
		user.setDateOfBirth(userDto.getDateOfBirth());
		user.setParentName(userDto.getParentName());
		user.setPrimaryContactName(userDto.getPrimaryContactName());
		user.setPrimaryContactPhoneNo(userDto.getPrimaryContactPhoneNo());
		user.setSecondaryContactName(userDto.getSecondaryContactName());
		user.setSecondaryContactPhoneNo(userDto.getSecondaryContactPhoneNo());
		user.setState(userDto.getState());
		user.setStudentName(userDto.getStudentName());
		user.setStudentRegNo(userDto.getStudentRegNo());
		user.setZipCode(userDto.getZipCode());
		user.setStatus(Constant.SUBMITTED);
		// gernerate 10 didigt number
		long theRandomNum = (long) (Math.random() * Math.pow(10, 10));
		user.setRegNo(theRandomNum);
		return user;
	}

	public User findByUserId(Integer id) {
		return userRepository.findById(id).get();

	}

	@Override

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LOGGER.info("loadUserByUsername");
		User user = userRepository.findByEmailId(username);

		Set<UserMapping> userMappings = userMappingService.findByUserId(user.getId());
		return UserDetailsImpl.build(user, userMappings);
	}

	public Long saveSatffUser(@Valid UserStaffDto signupDto) {
		LOGGER.info("saveUser");
		// check if alrady user exists
		User userDb = userRepository.findByEmailId(signupDto.getEmailId());
		if (userDb != null) {
			return userDb.getRegNo();
		}
		User user = setSatffUserData(signupDto);
		// save User
		User userRes = userRepository.save(user);
		// mapping
		if (userRes.getId() != null) {
			Role role = roleService.findById(Constant.ROLE_STAFF_ID);
			userMappingService.createMapping(userRes, role);

		}

		return userRes.getRegNo();
	}

	private User setSatffUserData(UserStaffDto signupDto) {
		User user = new User();
		user.setEmailId(signupDto.getEmailId());
		user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
		user.setRegisteredDate(LocalDate.now());
		long theRandomNum = (long) (Math.random() * Math.pow(10, 10));
		user.setRegNo(theRandomNum);
		return user;

	}

	public User updateUser(UserDto userDto) {
		User userDb = userRepository.findByEmailId(userDto.getEmailId());
		if (userDb == null) {
			throw new IllegalArgumentException();
		}
		User user = setUserData(userDto, userDb);
		return userRepository.save(user);

	}

	public List<User> getAllUsers() {
		List<UserMapping> mappings = userMappingService.findParentRoleUsers();
		return mappings.stream().map(map -> map.getUser()).collect(Collectors.toList());
	}

	public ResponseDto acceptOrRejectUser(Integer id, String status,UserDto  userDto) {
		User user = findByUserId(id);
		user.setStatus(status);
		user.setComment(userDto.getComment());
		userRepository.save(user);
		ResponseDto responseDto = new ResponseDto();
		responseDto.setMsg("Updated");
		return responseDto;
	}
}
