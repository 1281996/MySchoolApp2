package com.cog.service;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cog.entity.Role;
import com.cog.entity.User;
import com.cog.entity.UserMapping;
import com.cog.repository.UserMappingRepository;

@Service
public class UserMappingService {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserMappingService.class);

	@Autowired
	UserMappingRepository userMappingRepository;

	Set<UserMapping> findByUserId(int userId) {
		LOGGER.info("findByUserId");
		return userMappingRepository.findByUserId(userId);
	}

	public void createMapping(User userRes, Role role) {
		LOGGER.info("createMapping");
		UserMapping mapping = new UserMapping();
		mapping.setRole(role);
		mapping.setUser(userRes);
		userMappingRepository.save(mapping);
	}

	public List<UserMapping> findParentRoleUsers() {
		return userMappingRepository.findByRoleId(1);

	}
}
