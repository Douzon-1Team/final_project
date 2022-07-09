package com.example.final_project.mapper;

import com.example.final_project.dto.getVacationDataDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;
public interface getVacationDataMapper {
    @Select("SELECT A.GET_TO_WORK_TIME_SET workstart, A.GET_OFF_WORK_TIME_SET workend, A.get_to_work_time_set_f workstartf, A.get_off_work_time_set_f workendf, B.flexible flex, B.remaining_annual_leave remain " +
            "FROM manager_setting A " +
            "INNER JOIN emp_info_comp B ON A.dept_no=B.dept_no " +
            "WHERE A.dept_no=B.dept_no AND B.empno=#{empNo}")
    List<getVacationDataDto> readData(String empNo);
}
/*
    (1) emp_ino_comp 에 들어가서 flexible과 dept_no를 가져온다. (기준 empno)
    (2) manager_setting에 들어가서 dept_no와 flexible을 통해 지정된 시간을 꺼내온다.
 */
