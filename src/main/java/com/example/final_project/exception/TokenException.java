package com.example.final_project.exception;

import lombok.Getter;

@Getter
public class TokenException extends RuntimeException{

    private ErrorCode errorCode;

    public TokenException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
