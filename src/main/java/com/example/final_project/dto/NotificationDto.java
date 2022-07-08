package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Builder
@Getter
public class NotificationDto {
    int id;
    String name;
    String empno;
    String profile;
    LocalTime date;
}
