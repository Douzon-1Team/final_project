package com.example.final_project.service;

import com.example.final_project.dto.TokenDto;
import com.example.final_project.jwt.JwtTokenProvider;
import com.example.final_project.mapper.RefreshTokenMapper;
import com.example.final_project.model.RefreshToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenMapper refreshTokenMapper;

    public void login(TokenDto tokenDto){

        RefreshToken refreshToken = RefreshToken.builder().keyId(tokenDto.getKey()).refreshToken(tokenDto.getRefreshToken()).build();
        String userId = refreshToken.getKeyId();
        if(refreshTokenMapper.existsByKeyId(userId)){
            log.info("기존의 존재하는 refresh 토큰 삭제");
            refreshTokenMapper.deleteByKeyId(userId);
        }
        refreshTokenMapper.save(refreshToken);

    }

    public String validateRefreshToken(String refreshToken){
        RefreshToken token = refreshTokenMapper.findByRefreshToken(refreshToken).get();
        if(token == null) return null;

        String createdAccessToken = jwtTokenProvider.validateRefreshToken(token);
        return createdAccessToken;
    }
}