package com.example.final_project.service;

import com.amazonaws.services.dynamodbv2.xspec.S;
import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.ProgressBar52hMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class Graph52hService {
    private final EmployeeMapper employeeMapper;
    private final ProgressBar52hMapper progressBar52hMapper;

    public List<CalendarResponseDto> graph52h(String managerEmpno){
        List<CalendarResponseDto> dataList = new ArrayList<>();
        String deptNo = employeeMapper.findDeptNoByempno(managerEmpno);
        List<String> empnoList = employeeMapper.findEmpNoByDept(deptNo);
        for (String empno : empnoList) {
            try {
                dataList.add(CalendarResponseDto.builder().empno(empno)
                                .name(employeeMapper.findNameByempno(empno))
                                .attendanceWeek(progressBar52hMapper.attendanceWeek(empno))
                                .overtimeWeek(progressBar52hMapper.overtimeWeek(empno)).build());
            }catch (NullPointerException e){
                System.out.println(empno + " : NullPointerException!!");
            }
        }
        return dataList;
    }
}
