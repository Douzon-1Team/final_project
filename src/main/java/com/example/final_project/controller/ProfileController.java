package com.example.final_project.controller;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/profile/{empno}")
    public ResponseEntity<EmpInfoDto> getProfile(@PathVariable String empno){
        EmpInfoDto empInfoDto = profileService.getProfile(empno);
        return ResponseEntity.ok().body(empInfoDto);
    }

//    @PostMapping("/profile/update/{empno}")
//    public ResponseEntity<EmpInfoDto> updateProfile(@RequestBody EmpInfoDto empInfoDto){
//        profileService.updateProfile(empInfoDto);
//        return ResponseEntity.ok().body(empInfoDto);
//    }
}
