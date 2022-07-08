package com.example.final_project.controller;

import com.example.final_project.dto.getVacationDataDto;
import com.example.final_project.service.getVacationDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class getVacationDataController {
    private final getVacationDataService getVacationDataService;
    @GetMapping("/getvacationdata")
    public ResponseEntity getvacationdata(@RequestParam String empNo){
        List<getVacationDataDto> dto=getVacationDataService.getvacationdata(empNo);
        return ResponseEntity.ok().body(dto);
    }
}
