package com.example.final_project.service;

import com.example.final_project.dto.DeleteAttendanceDto;
import com.example.final_project.mapper.DeleteAttendanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteAttendanceService {
    private final DeleteAttendanceMapper deleteAttendanceMapper;

    public void attendance(DeleteAttendanceDto dto) {
        if(deleteAttendanceMapper.save(dto)==0)
            throw new IllegalArgumentException("근태 삭제에 실패하였습니다.");
    }
}
