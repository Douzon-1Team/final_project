package com.example.final_project.controller;

import com.example.final_project.dto.NotificationDto;
import com.example.final_project.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    @GetMapping("/main/notification")
    public ResponseEntity<?> tardyList(@RequestParam("empno") String empno){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        List<NotificationDto> notificationDto = notificationService.tardyMemberList(empno);
        return ResponseEntity.ok().headers(headers).body(notificationDto);
    }
}
