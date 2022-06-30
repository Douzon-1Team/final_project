package com.example.final_project.exception;

import lombok.Getter;

@Getter
public class PasswordException extends RuntimeException{

    private ErrorCode errorCode;

    public PasswordException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
