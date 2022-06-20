package com.example.final_project;


import com.example.final_project.mapper.DeptMapper;
import org.junit.jupiter.api.Test;

public class test {
    public DeptMapper pb52Mapper;
    @Test
    public void aaa() throws Exception {
        System.out.println(pb52Mapper.findByDeptNo("01"));
    }
}
