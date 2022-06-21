package com.example.final_project;

import com.example.final_project.mapper.ProgressBar52hMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
@MapperScan(value={"com.example.final_project.mapper"})
@SpringBootApplication
public class FinalProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(FinalProjectApplication.class, args);}

}
