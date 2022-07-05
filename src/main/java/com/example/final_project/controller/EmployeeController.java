package com.example.final_project.controller;

import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.dto.LoginResponseDto;
import com.example.final_project.dto.TokenDto;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.jwt.JwtTokenProvider;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Employee;
import com.example.final_project.service.EmployeeService;
import com.example.final_project.service.JwtService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

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

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(TokenDto dto){
        employeeService.logout(dto);
        return ResponseEntity.ok().build();
    }

}
