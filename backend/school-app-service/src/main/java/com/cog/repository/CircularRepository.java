package com.cog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cog.entity.Circular;
@Repository
public interface CircularRepository extends JpaRepository<Circular, Integer> {

}
