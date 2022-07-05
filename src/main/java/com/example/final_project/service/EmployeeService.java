package com.example.final_project.service;

import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.dto.LoginResponseDto;
import com.example.final_project.dto.TokenDto;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.exception.PasswordException;
import com.example.final_project.jwt.JwtTokenProvider;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService implements UserDetailsService {

    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return employeeMapper.findByUserId(userId)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
    }
    @Transactional
    public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse response){
        Employee employee = employeeMapper.findByUserId(loginRequestDto.getEmpno())
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), employee.getPassword()))
            throw new PasswordException(ErrorCode.WRONG_PASSWORD);

        TokenDto tokenDto = jwtTokenProvider.createAccessToken(employee.getUsername(), employee.getRole());
        jwtService.login(tokenDto);

        Cookie cookie = new Cookie("refresh_token", tokenDto.getRefreshToken());
        cookie.setPath("/");
        cookie.setSecure(true);
//        cookie.setHttpOnly(true);

        response.addCookie(cookie);

        LoginResponseDto dto = LoginResponseDto.builder()
                .accessToken(tokenDto.getAccessToken())
                .name(employee.getName())
                .profile(employee.getProfile())
                .role(employee.getRole())
                .empno(employee.getEmpno())
                .build();

        return dto;
    }

    @Transactional
    public String reissue(String refreshToken){
        return jwtService.validateRefreshToken(refreshToken);
    }

}
