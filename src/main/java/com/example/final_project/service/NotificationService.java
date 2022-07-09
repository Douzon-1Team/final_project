package com.example.final_project.service;

import com.example.final_project.dto.NotificationDto;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationMapper notificationMapper;
    private final EmployeeMapper employeeMapper;

    public List<NotificationDto> tardyMemberList(String empno){
        List<NotificationDto> notificationDtoList = new ArrayList<>();
        int numb = 1;
        String deptNo = employeeMapper.findDeptNoByempno(empno);
        List<String> empnoList = notificationMapper.findTardyMemberByDept(deptNo);
        for (String empnoDept : empnoList) {
            String name = employeeMapper.findNameByempno(empnoDept);
            String profile = employeeMapper.findProfileByempno(empnoDept);
            LocalTime date = notificationMapper.findOnWorkTimeByempno(empnoDept).toLocalTime();
            boolean approve = (notificationMapper.findAcceptByempno(empnoDept).isPresent() || notificationMapper.findAgreeByempno(empnoDept).isPresent());
            if(approve)log.info("짠");
            notificationDtoList.add(NotificationDto.builder()
                    .id(numb)
                    .empno(empnoDept)
                    .name(name)
                    .profile(profile)
                    .approve(approve)
                    .date(date).build());
            numb++;
        }
        return notificationDtoList;
    }

}
