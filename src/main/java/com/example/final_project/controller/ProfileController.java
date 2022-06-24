package com.example.final_project.controller;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletException;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/profile/{empno}")
    public ResponseEntity<EmpInfoDto> getProfile(@PathVariable String empno){
        EmpInfoDto empInfoDto = profileService.getProfile(empno);
        return ResponseEntity.ok().body(empInfoDto);
    }

//    @PostMapping("/profile/update")
//    public ResponseEntity updateProfile(@RequestPart(value = "EmpUpdateDto") EmpUpdateDto updateDto,
//                                        @RequestPart(value = "file", required = false) MultipartFile profile){
//        System.out.println(updateDto);
//        profileService.updateProfile(updateDto, profile);
//        return ResponseEntity.ok().build();
//    }

//    @PostMapping("/profile/update")
//    public ResponseEntity updateProfile(@RequestBody Object profile){
//        System.out.println(profile);
////        profileService.updateProfile(updateDto, profile);
//        return ResponseEntity.ok().build();
//    }

    @PostMapping(path = "/profile/update")
    public String updateProfile(@RequestBody HashMap<String, Object> param){
        System.out.println(param.get("image"));
        System.out.println(param);
        return param.get("image").toString();
    }
}
