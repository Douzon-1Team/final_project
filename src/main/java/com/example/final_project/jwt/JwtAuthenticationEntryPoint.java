package com.example.final_project.jwt;


import com.example.final_project.exception.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        ErrorCode exception = (ErrorCode) request.getAttribute("exception");

        if(exception == null)
            setResponse(response, ErrorCode.UNKNOWN_TOKEN);

        else if(exception == ErrorCode.WRONG_TYPE_TOKEN)
            setResponse(response, ErrorCode.WRONG_TYPE_TOKEN);

        else if(exception == ErrorCode.EXPIRED_TOKEN)
            setResponse(response, ErrorCode.EXPIRED_TOKEN);

        else
            setResponse(response, ErrorCode.ACCESS_DENIED);

    }

    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.sendError(errorCode.getCode(), errorCode.getMessage());
    }
}