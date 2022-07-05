package com.example.final_project.mapper;

import com.example.final_project.dto.ManagerSettingDto;
import com.example.final_project.model.Employee;
import com.example.final_project.model.ManagerSetting;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.time.LocalTime;
import java.util.Optional;

public interface ManagerSettingMapper {

    @Select("SELECT c.dept_no deptNo, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f, flexible " +
            "FROM manager_setting m inner join emp_info_comp c on m.dept_no = c.dept_no WHERE empno = #{empno}")
    Optional<ManagerSettingDto> findByDeptNo(String empno);

    @Update("UPDATE manager_setting " +
            " SET" +
            " get_to_work_time_set = #{getToWorkTimeSet}, " +
            " get_off_work_time_set = #{getOffWorkTimeSet}, " +
            " get_to_work_time_set_f = #{getToWorkTimeSetF}, " +
            " get_off_work_time_set_f = #{getOffWorkTimeSetF}" +
            " WHERE dept_no=#{deptNo}")
    int updateTime(ManagerSetting managerSetting);

    @Update("UPDATE manager_setting SET chart_stat=#{chartStat} where dept_no=#{deptNo}")
    int updateGraph(ManagerSetting managerSetting);
}
