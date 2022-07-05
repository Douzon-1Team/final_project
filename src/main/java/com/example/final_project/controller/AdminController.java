package com.example.final_project.controller;


import com.example.final_project.dto.*;
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

    @PostMapping("/admin/register")
    public ResponseEntity register(@RequestPart(value = "EmpInfoDto") EmpInfoDto registerDto,
                                   @RequestPart(value = "file") MultipartFile profile){
        adminService.register(registerDto, profile);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/update")
    public ResponseEntity update(@RequestPart(value = "EmpUpdateDto", required = false) EmpUpdateDto updateDto,
                                 @RequestPart(value = "file", required=false) MultipartFile profile){
        adminService.update(updateDto, profile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/list")
    public ResponseEntity<List<EmpListResponseDto>> list(){
        List<EmpListResponseDto> dto = adminService.list();
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("admin//remove/{empno}")
    public ResponseEntity remove(@PathVariable String empno) {
        adminService.remove(empno);
        return ResponseEntity.ok().build();
    }
}
