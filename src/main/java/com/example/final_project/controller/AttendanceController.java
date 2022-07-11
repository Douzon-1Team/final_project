package com.example.final_project.controller;

import com.example.final_project.dto.*;
import com.example.final_project.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/attendance/acceptatt")
    public ResponseEntity acceptatt(@RequestBody AcceptAttDto dto){
        attendanceService.acceptatt(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/attendance/attendancelist")
    public ResponseEntity attendancelist(@RequestParam String empno) {
        List<AttendanceListDto> dto = attendanceService.attendancelist(empno);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/attendance/delattendancereq")
    public ResponseEntity delAttendance(@RequestBody DeleteAttendanceDto dto){
        attendanceService.attendance(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/attendance/reqlist")
    public ResponseEntity reqlist(@RequestParam  String empno){
        List<ReqListDto> dto = attendanceService.reqlist(empno);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/attendance/rejectreq")
    public ResponseEntity rejectreq(@RequestBody RejectReqDto dto){
        attendanceService.rejectreq(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/attendance/req")
    public ResponseEntity vacation2(@RequestBody VacationRequestDto dto) {
        attendanceService.request(dto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/attendance/gettargetdate")
    public ResponseEntity<?> gettargetdate(@RequestParam String empNo, String date){
        List<GetTargetDateDto> dto = attendanceService.getTargetDate(empNo, date);
        return ResponseEntity.ok().body(dto);
    }
}
