package com.example.final_project.controller;

import com.example.final_project.dto.*;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestPart(value = "EmpInfoDto") EmpInfoDto registerDto,
                                   @RequestPart(value = "file") MultipartFile profile){
        adminService.register(registerDto, profile);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update")
    public ResponseEntity update(@RequestBody EmpUpdateDto updateDto){
        adminService.update(updateDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<EmpListResponseDto>> list(){
        List<EmpListResponseDto> dto = adminService.list();
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/admin/remove/{empno}")
    public ResponseEntity remove(@PathVariable String empno) {
        adminService.remove(empno);
        return ResponseEntity.ok().build();
    }
}