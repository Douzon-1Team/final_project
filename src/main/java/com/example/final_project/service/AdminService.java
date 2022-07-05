package com.example.final_project.service;

import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.exception.PasswordException;
import com.example.final_project.mapper.AdminMapper;
import com.example.final_project.mapper.DeptMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpListResponseDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmpInfoCompMapper empInfoCompMapper;
    private final EmployeeMapper employeeMapper;
    private final DeptMapper deptMapper;
    private final AdminMapper adminMapper;
    private final QRService qrService;
    private final S3Service s3Service;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void register(EmpInfoDto empInfoDto, MultipartFile profile){

        String deptNo = deptMapper.findByDeptName(empInfoDto.getDeptName());
        String empno = createEmpNo(deptNo);
        String pwd = passwordEncoder.encode("dz"+empno);
        String email = empno+"@douzone.net";

        File qr = qrService.createQR(empno);
        String qrUrl = s3Service.uploadFile(qr);
        String profileUrl = s3Service.uploadProfile(profile, empno);

        employeeMapper.save(EmpInfoDto.toEmployee(empInfoDto, empno, profileUrl, pwd, qrUrl));
        empInfoCompMapper.save(EmpInfoDto.toEmpInfoComp(empInfoDto, empno, deptNo, email));
    }

    public String createEmpNo(String deptNo){

        int year = Calendar.getInstance().get(Calendar.YEAR)%100;
        int unique = Integer.valueOf(empInfoCompMapper.findLastEmpno(deptNo, year))+1;

        return String.valueOf(unique);
    }

    @Transactional
    public void update(EmpUpdateDto updateDto, MultipartFile profile){
        employeeMapper.findByUserId(updateDto.getEmpno())
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        String profileUrl = null;
        if(profile != null)
            profileUrl = s3Service.uploadProfile(profile, updateDto.getEmpno());

        String password = null;
        if(updateDto.getNewPwd() != null) {
            validatePassword(updateDto.getNewPwd(), updateDto.getChkPwd());
            password = passwordEncoder.encode(updateDto.getNewPwd());
        }

        if(!updateDto.getName().isEmpty() || profileUrl != null || password != null || updateDto.getRole() != null || updateDto.isResigned())
            employeeMapper.updateByEmpno(EmpUpdateDto.toEmployee(updateDto, password, profileUrl));

        if(!updateDto.getDeptName().isEmpty() || !updateDto.getRankName().isEmpty()) {
            String deptNo = deptMapper.findByDeptName(updateDto.getDeptName());
            empInfoCompMapper.updateByEmpno(EmpUpdateDto.toEmpInfoComp(updateDto, deptNo));
        }
    }

    public void validatePassword(String newPwd, String chkPwd){

        if(!newPwd.equals(chkPwd))
            throw new PasswordException(ErrorCode.MISMATCH_PASSWORD);

        if(newPwd.equals(newPwd))
            throw new PasswordException(ErrorCode.SAME_PASSWORD);
    }

    @Transactional
    public List<EmpListResponseDto> list(){
        return adminMapper.findByNotResigned();
    }

    @Transactional
    public void remove(String empno){
        Employee emp = employeeMapper.findByUserId(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
        employeeMapper.remove(empno);
        s3Service.s3Delete(emp.getProfile(), emp.getQr());
    }
}
