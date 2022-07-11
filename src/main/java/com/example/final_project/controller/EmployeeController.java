package com.example.final_project.controller;

import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.dto.LoginResponseDto;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response){
        LoginResponseDto dto = employeeService.login(loginRequestDto, response);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

    @PostMapping("/refresh")
    public ResponseEntity validateRefreshToken(@RequestBody String refreshToken){
        String accessToken = employeeService.reissue(refreshToken);

        if(accessToken == null)
            return ResponseEntity.status(ErrorCode.EXPIRED_TOKEN.getCode()).body(ErrorCode.EXPIRED_TOKEN.getMessage());

        return ResponseEntity.ok().body(accessToken);
    }

    @GetMapping("/")
    public void logoutSuccess(){
        System.out.println("로그아웃 성공");
    }

}
