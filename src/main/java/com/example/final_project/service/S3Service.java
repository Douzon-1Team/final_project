package com.example.final_project.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@PropertySource("classpath : application.yml")
@Component
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public String uploadProfile(MultipartFile multipartFile, String empno){
        String filePath = "src/main/resources/profile/";
        String fileName = "profile-"+empno;
        String extendsion = ".png";

        File uploadImg = convert(multipartFile, filePath+fileName+extendsion)  // 파일 변환 후 로컬에 저장
                .orElseThrow(() -> new IllegalArgumentException("파일 변환에 실패하였습니다."));

        String url = s3Uploader(uploadImg, fileName); // s3로 업로드

        uploadImg.delete(); //로컬에 저장된 이미지 삭제

        return url;
    }

    @Transactional
    public String uploadFile(File file){

        String fileName = file.getName();
        String url = s3Uploader(file, fileName);

        file.delete();

        return url;
    }

    // S3로 업로드
    private String s3Uploader(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 파일변환
    private Optional<File> convert(MultipartFile file, String fileName) {
        File convertFile = new File(fileName);
        try {
            if (convertFile.createNewFile()) {
                FileOutputStream fos = new FileOutputStream(convertFile);
                fos.write(file.getBytes());
            }
        }catch(IOException e){
            e.printStackTrace();
        }

        return Optional.of(convertFile);
    }
}
