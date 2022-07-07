package com.example.final_project.mapper;

import com.example.final_project.dto.getVacationDataDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;
public interface getVacationDataMapper {
    @Select("SELECT GET_TO_WORK_TIME_SET workStart, GET_OFF_WORK_TIME_SET workEnd FROM MANAGER_SETTING A WHERE A.DEPT_NO IN(SELECT B.DEPT_NO FROM EMP_INFO_COMP B WHERE B.EMPNO=#{empNo})")
    List<getVacationDataDto> readData(String empNo);
}
