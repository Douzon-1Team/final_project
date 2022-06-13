package com.example.final_project.controller;

import com.example.final_project.model.Code;
import com.example.final_project.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RefreshController {

    private final JwtService jwtService;

    @PostMapping("/refresh")
    public ResponseEntity validateRefreshToken(@RequestBody Map<String, String> body, HttpServletResponse response) throws IOException {

        log.info("refresh controller 실행");
        String accessToken = jwtService.validateRefreshToken(body.get("refresh_token"));

        if(accessToken == null){
            response.sendError(Code.EXPIRED_TOKEN.getCode(), Code.EXPIRED_TOKEN.getMessage());
            return null;
        }

        log.info("RefreshController - Refresh Token이 유효.");
        return new ResponseEntity(accessToken, HttpStatus.OK);

    }
}