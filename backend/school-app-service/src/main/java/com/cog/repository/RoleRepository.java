package com.cog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cog.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
