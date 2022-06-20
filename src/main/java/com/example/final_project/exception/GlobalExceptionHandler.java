package com.example.final_project.exception;

import com.example.final_project.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PasswordException.class)
    public ResponseEntity<ErrorResponseDto> PasswordExceptionHandler(PasswordException e){
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponseDto error = new ErrorResponseDto(errorCode.getCode(), errorCode.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ErrorResponseDto> TokenExceptionHandler(TokenException e){
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponseDto error = new ErrorResponseDto(errorCode.getCode(), errorCode.getMessage());
        return ResponseEntity.status(errorCode.getCode()).body(error);
    }

    @ExceptionHandler(EmpException.class)
    public ResponseEntity<ErrorResponseDto> EmpExceptionHandler(EmpException e){
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponseDto error = new ErrorResponseDto(errorCode.getCode(), errorCode.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
