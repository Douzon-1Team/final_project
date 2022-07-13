package com.example.final_project.service;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.SubComponentMapper;
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
    private final SubComponentMapper subComponentMapper;

    public List<CalendarResponseDto> graph52h(String managerEmpno){
        List<CalendarResponseDto> dataList = new ArrayList<>();
        String deptNo = employeeMapper.findDeptNoByempno(managerEmpno);
        List<String> empnoList = employeeMapper.findEmpNoByDept(deptNo);
        for (String empno : empnoList) {
            try {
                dataList.add(CalendarResponseDto.builder().empno(empno)
                                .name(employeeMapper.findNameByempno(empno))
                                .attendanceWeek(subComponentMapper.attendanceWeek(empno))
                                .overtimeWeek(subComponentMapper.overtimeWeek(empno)).build());
            }catch (NullPointerException e){
                System.out.println(empno + " : NullPointerException!!");
            }
        }
        return dataList;
    }
}
