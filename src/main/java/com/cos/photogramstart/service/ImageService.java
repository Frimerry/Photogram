package com.cos.photogramstart.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.photogramstart.config.auth.PrincipalDetails;
import com.cos.photogramstart.domain.image.Image;
import com.cos.photogramstart.domain.image.ImageRepository;
import com.cos.photogramstart.web.dto.image.ImageUploadDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ImageService {
	
	private final ImageRepository imageRepository;
	
	/* 메인 스토리 목록 */
	@Transactional(readOnly=true)
	public Page<Image> imageStory(int principalId, Pageable pageable){
		return imageRepository.mStory(principalId, pageable);
	}
	
	@Value("${file.path}")	// application.yml
	private String uploadFolder;
	
	/* 사진 업로드 */
	@Transactional
	public void uploadImage(ImageUploadDto imageUploadDto, PrincipalDetails principalDetails) {
		// 범용고유식별자
		UUID uuid = UUID.randomUUID();
		String imageFileName = uuid+ "_"+ imageUploadDto.getFile().getOriginalFilename();
		
		Path imageFilePath = Paths.get(uploadFolder+imageFileName);
		
		try {
			Files.write(imageFilePath, imageUploadDto.getFile().getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Image image = imageUploadDto.toEntity(imageFileName, principalDetails.getUser());
		Image imageEntity = imageRepository.save(image);
		
	}

}
