package com.cog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cog.entity.Acknowledge;
@Repository
public interface AcknowledgeRepository extends JpaRepository<Acknowledge, Integer> {

}
