package com.example.final_project.jwt;

import com.example.final_project.dto.TokenDto;
import com.example.final_project.model.RefreshToken;
import com.example.final_project.model.Role;
import org.springframework.security.core.Authentication;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

public interface TokenProvider {

    public TokenDto createAccessToken(String userId, Role role);

    public boolean validateToken(String jwtToken, ServletRequest request);

    public String validateRefreshToken(RefreshToken token);

    public String recreationAccessToken(String userId, Object role);

    public Authentication getAuthentication(String token);

    public String getUserId(String token);

    public String resolveToken(HttpServletRequest request);

}