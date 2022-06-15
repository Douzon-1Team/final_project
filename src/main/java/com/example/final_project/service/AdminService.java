package com.example.final_project.service;

import com.example.final_project.mapper.EmpInfoCompMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmpInfoCompMapper empInfoCompMapper;

    @Transactional
    public String createEmpNo(String deptno){

        int year = Calendar.getInstance().get(Calendar.YEAR)%100;
        String unique = String.format("%05d", empInfoCompMapper.count(deptno, year)+1);

        return year+deptno+unique;
    }
}
