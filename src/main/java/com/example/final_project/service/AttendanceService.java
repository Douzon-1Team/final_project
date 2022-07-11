package com.example.final_project.service;

import com.example.final_project.dto.*;
import com.example.final_project.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceMapper attendanceMapper;

    @Transactional
    public void attendance(DeleteAttendanceDto dto) {
        if(attendanceMapper.deleteAttReq(dto) == 0)
            throw new IllegalArgumentException("근태 삭제에 실패하였습니다.");
    }

    @Transactional
    public List<AttendanceListDto> attendancelist(String empno){
        return attendanceMapper.readAttendanceList(empno);
    }

    @Transactional
    public void acceptatt(AcceptAttDto dto){
        if(attendanceMapper.updateAttStat(dto) == 0)
            throw new IllegalArgumentException("에러 발생");
    }

    @Transactional
    public List<ReqListDto> reqlist(String empno){
        return attendanceMapper.readReqList(empno);
    }

    @Transactional
    public void rejectreq(RejectReqDto dto){
        if(attendanceMapper.updateAttReq(dto) == 0)
            throw new IllegalArgumentException("신청서 반려에 실패하였습니다.");
    }

    @Transactional
    public void request(VacationRequestDto dto){
        if(attendanceMapper.saveAttendanceReq(dto) == 0)
            throw new IllegalArgumentException("근태 등록에 실패하였습니다.");
    }

    @Transactional
    public List<GetTargetDateDto> getTargetDate(String empNo, String date){
        return attendanceMapper.targetdate(empNo, date);
    }
}
