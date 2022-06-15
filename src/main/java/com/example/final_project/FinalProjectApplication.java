package com.example.final_project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

<<<<<<< HEAD
@MapperScan(value={"com.example.final_project.mapper"})
=======
@MapperScan(value = {"com.example.final_project.mapper"})
>>>>>>> main
@SpringBootApplication
public class FinalProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinalProjectApplication.class, args);
    }

}
