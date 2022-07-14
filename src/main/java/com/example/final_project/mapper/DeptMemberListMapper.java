package com.example.final_project.mapper;

import com.example.final_project.dto.DeptMemberListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface DeptMemberListMapper {
    @Select("select emp_profile, e.empno, e.emp_name name, c.rank, extension_num, email, c.dept_no, d.dept_name, IFNULL(attendance, 0) attendance, IFNULL(tardy, 0) tardy, IFNULL(etc, '출근') etc, IFNULL(unregistered, 0) unregistered\n" +
            "            from emp_info_comp c join employee e on c.empno = e.empno join dept d on d.dept_no = c.dept_no left join attendance_status `as` on e.empno = `as`.empno and DATE_FORMAT(date,'%Y-%m-%d') = DATE_FORMAT(#{date}, '%Y-%m-%d')\n" +
            "            where c.dept_no in (select dept_no from emp_info_comp where empno=#{empno}) and resigned=0;")
    List<DeptMemberListDto> findDeptMemberList(String empno, String date);
}
