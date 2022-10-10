package com.cog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cog.entity.Acknowledge;
import com.cog.entity.Circular;
@Repository
public interface AcknowledgeRepository extends JpaRepository<Acknowledge, Integer> {

	List<Acknowledge> findByEmailAndCircular(String email, Circular circular);

}
