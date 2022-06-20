package com.example.final_project.exception;

import lombok.Getter;

@Getter
public class EmpException extends IllegalArgumentException{

    private ErrorCode errorCode;

    public EmpException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
