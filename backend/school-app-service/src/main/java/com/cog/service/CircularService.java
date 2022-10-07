package com.cog.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.cog.dto.ResponseDto;
import com.cog.entity.Acknowledge;
import com.cog.entity.Circular;
import com.cog.repository.AcknowledgeRepository;
import com.cog.repository.CircularRepository;

@Service
public class CircularService {

	@Autowired
	CircularRepository circularRepository;

	@Autowired
	AcknowledgeRepository acknowledgeRepository;

	public List<Circular> getAllCirculars() {
		return circularRepository.findAll();
	}

	public void createCircular(Circular circular) {
		circularRepository.save(circular);
}

	public ResponseDto createAcknowledge(Acknowledge acknowledge, Integer circularId) {
		Optional<Circular> circularDb = circularRepository.findById(circularId);
		circularDb.ifPresent(circular -> {
			acknowledge.setAcknowledgeDate(LocalDate.now());
			acknowledge.setCircular(circular);
			acknowledgeRepository.save(acknowledge);
		});
		ResponseDto responseDto = new ResponseDto();
		responseDto.setMsg("updated");
		return responseDto;

	}

	public List<Acknowledge> getAllAcknowledges() {
		return acknowledgeRepository.findAll();
	}

}
