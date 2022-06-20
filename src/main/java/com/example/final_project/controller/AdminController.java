package com.example.final_project.controller;

import com.example.final_project.dto.*;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/admin/register")
    public ResponseEntity register(@RequestBody EmpInfoDto registerDto){
        adminService.register(registerDto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/update")
    public ResponseEntity update(@RequestBody EmpUpdateDto updateDto, HttpServletResponse response) throws IOException {
        adminService.update(updateDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/list")
    public ResponseEntity<List<EmpListResponseDto>> list(@RequestBody SearchFilterRequestDto filterDto){
        List<EmpListResponseDto> dto = adminService.list(filterDto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/admin/remove/{empno}")
    public ResponseEntity remove(@PathVariable String empno) {
        adminService.remove(empno);
        return ResponseEntity.ok().build();
    }
}