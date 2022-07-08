package com.example.final_project.service;

import com.example.final_project.dto.ManagerSettingDto;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.ManagerSettingMapper;
import com.example.final_project.model.ManagerSetting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ManagerSettingService {

    private final EmployeeMapper employeeMapper;
    private final EmpInfoCompMapper empInfoCompMapper;
    private final ManagerSettingMapper managerSettingMapper;

    @Transactional
    public ManagerSettingDto getWorkTime(String empno){
        ManagerSettingDto dto = managerSettingMapper.findByDeptNo(empno).get();
        return dto;
    }

    // 1. 근무시간 선택
    @Transactional
    public void updateWorkTimeChoice(ManagerSettingDto managerSettingDto){
        String empno = managerSettingDto.getEmpno();
        String flexible = managerSettingDto.getFlexible();
        empInfoCompMapper.updateFlexible(empno, flexible);
    }

    // 2. 근무시간 설정
    @Transactional
    public void updateWorkTime(ManagerSettingDto managerSettingDto) {
        String empno = managerSettingDto.getEmpno();
//        String roleChk = employeeMapper.findByUserRole(empno);

//        System.out.println(empno + roleChk);
//        if (!roleChk.equals("ROLE_USER")) {
            LocalTime WORK_START = managerSettingDto.getGetToWorkTimeSet();
            LocalTime WORK_END = managerSettingDto.getGetOffWorkTimeSet();
            LocalTime WORK_START_F = managerSettingDto.getGetToWorkTimeSetF();
            LocalTime WORK_END_F = managerSettingDto.getGetOffWorkTimeSetF();

            Time start = Time.valueOf(WORK_START);
            Time end = Time.valueOf(WORK_END);
            Time startFlex = Time.valueOf(WORK_START_F);
            Time endFlex = Time.valueOf(WORK_END_F);

            ManagerSetting ms = ManagerSettingDto.toTimeSetting(managerSettingDto, start, end, startFlex, endFlex);
            System.out.println(ms);
            managerSettingMapper.updateTime(ms);
//        } else {
//            String flexible = managerSettingDto.getFlexible();
//            empInfoCompMapper.updateFlexible(empno, flexible);
//            System.out.println(flexible);
//        }
//        System.out.println("끝");
    }

    @Transactional
    public void updateGraph(ManagerSettingDto managerSettingDto){
        String graph = managerSettingDto.getGraph();
        ManagerSetting ms = managerSettingDto.toGraphSetting(managerSettingDto, graph);
        managerSettingMapper.updateGraph(ms);
    }
}
