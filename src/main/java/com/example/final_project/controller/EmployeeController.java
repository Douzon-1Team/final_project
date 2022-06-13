package com.example.final_project.controller;

import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.dto.LoginResponseDto;
import com.example.final_project.dto.TokenDto;
import com.example.final_project.jwt.JwtTokenProvider;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Employee;
import com.example.final_project.service.JwtService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@PropertySource("classpath:application.yml")
@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmployeeMapper employeeMapper;
    private final JwtService jwtService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) throws JsonProcessingException {
        Employee employee = employeeMapper.findByUserId(loginRequestDto.getEmpno())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사번 입니다."));
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), employee.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        TokenDto tokenDto = jwtTokenProvider.createAccessToken(employee.getUsername(), employee.getRole());
        jwtService.login(tokenDto);

        Cookie cookie = new Cookie("refresh_token", tokenDto.getRefreshToken());
        cookie.setPath("/login");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);

        response.addCookie(cookie);

        return new ResponseEntity<>(new LoginResponseDto(tokenDto.getAccessToken(), employee), HttpStatus.OK);
    }

    //Token test
    @RestController
    public class TestController {
        @PostMapping("/test")
        public HttpStatus test(){
            return HttpStatus.OK;
        }
    }
}