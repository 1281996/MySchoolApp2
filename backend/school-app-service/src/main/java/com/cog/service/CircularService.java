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

	public List<Circular> getAllCirculars(String email) {
		List<Circular> filteredList= circularRepository.findAll();
				filteredList.forEach(circular->{
			 List<Acknowledge> acknowledge=acknowledgeRepository.findByEmailAndCircular(email,circular);
			System.out.println(acknowledge.toString());
			 if(!acknowledge.isEmpty()) {
				circular.setAckonwledgeFlag(true);
			}
		 });
		return filteredList;
	}

	public void createCircular(Circular circular) {
		circularRepository.save(circular);
	}

	public ResponseDto createAcknowledge(Acknowledge acknowledge, Integer circularId) {
		Optional<Circular> circularDb = circularRepository.findById(circularId);
		ResponseDto responseDto = new ResponseDto();
		if (circularDb.isPresent()) {
			List<Acknowledge> checkAcknowledge = acknowledgeRepository.findByEmailAndCircular(acknowledge.getEmail(),
					circularDb.get());
			if (!checkAcknowledge.isEmpty()) {
				responseDto.setMsg("Already acknowledged");
				return responseDto;
			}
			acknowledge.setAcknowledgeDate(LocalDate.now());
			acknowledge.setCircular(circularDb.get());
			acknowledgeRepository.save(acknowledge);
		}

		responseDto.setMsg("Acknowledged Sent Successfully");
		return responseDto;

	}

	public List<Acknowledge> getAllAcknowledges() {
		return acknowledgeRepository.findAll();
	}

}
