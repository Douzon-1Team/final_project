package com.example.final_project.controller;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // 사원 정보 조회
    @GetMapping("/profile/{empno}")
    public ResponseEntity<EmpInfoDto> getProfile(@PathVariable String empno){
        EmpInfoDto empInfoDto = profileService.getProfile(empno);
        return ResponseEntity.ok().body(empInfoDto);
    }

    // 비밀번호 변경
    @PostMapping("/profile/updatePwd")
    public ResponseEntity updatePwd(@RequestBody EmpUpdateDto updateDto) {
        profileService.updatePwd(updateDto);
        return ResponseEntity.ok().build();
    }

    // 프로필 사진 변경
    @PostMapping("/profile/updateImg")
    public ResponseEntity updateProfile(@RequestBody EmpUpdateDto empUpdateDto){
        profileService.updateProfile(empUpdateDto);
        return ResponseEntity.ok().build();
    }
}
