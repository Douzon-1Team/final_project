package com.example.final_project.controller;

import com.example.final_project.dto.GetTargetDateDto;
import com.example.final_project.service.GetTargetDateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GetTargetDateController {
    private final GetTargetDateService getTargetDateService;
    @GetMapping("/gettargetdate")
    public ResponseEntity<?> gettargetdate(@RequestParam String empNo, String date){
        List<GetTargetDateDto> dto=getTargetDateService.gettargetdate(empNo, date);
        return ResponseEntity.ok().body(dto);
    }
}
