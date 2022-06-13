package com.example.final_project.service;

import com.example.final_project.mapper.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService implements UserDetailsService {

    private final EmployeeMapper employeeMapper;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return employeeMapper.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사번 입니다."));
    }
}