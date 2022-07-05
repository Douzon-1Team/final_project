package com.example.final_project.jwt;

import java.util.Date;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;  ///  pom.xml에 라이브러리 추가

import com.example.final_project.dto.TokenDto;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.model.RefreshToken;
import com.example.final_project.model.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@PropertySource("classpath:application.yml")
@RequiredArgsConstructor   // 필수 멤버변수만 갖는 생성자함수
@Component
public class JwtTokenProvider implements TokenProvider{

    private SecretKey secretKey;

    @Value("${jwt.secret}")
    private String secretMessage;
    @Value("${jwt.token.validation.access}")
    private long accessTokenValidTime;
    @Value("${jwt.token.validation.refresh}")
    private long refreshTokenValidTime;

    @Autowired
    private UserDetailsService  userDetailsService;

    //객체 초기화 (secretKey encoding)
    @PostConstruct
    protected void init() {  // 객체 초기화
        secretKey = Keys.hmacShaKeyFor(secretMessage.getBytes());
        accessTokenValidTime *= 1000L;
        refreshTokenValidTime *= 1000L;
    }

    // JWT token create
    @Override
    public TokenDto createAccessToken(String userId, Role role) {

        Claims claims = Jwts.claims().setSubject(userId); // JWT payload에 저장되는 정보 단위
        claims.put("role", role);  //
        Date now = new Date();

        String accessToken =  Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims) // 정보저장
                .setIssuedAt(now)  // 토큰 발행 시간
                .setExpiration(new Date(now.getTime() + accessTokenValidTime)) // 만료 시간 세팅
                .signWith(secretKey) // 암호화 알고리즘 + secretKey = signature
                .compact();

        String refreshToken = Jwts.builder()
                .setClaims(claims) // 정보저장
                .setIssuedAt(now)  // 토큰 발행 시간
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // 만료 시간 세팅
                .signWith(secretKey) // 암호화 알고리즘 + secretKey = signature
                .compact();

        return TokenDto.builder().accessToken(accessToken).refreshToken(refreshToken).key(userId).build();
    }

    @Override
    public boolean validateToken(String jwtToken, ServletRequest request){
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
           return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", ErrorCode.EXPIRED_TOKEN);
            e.printStackTrace();
        } catch(MalformedJwtException e){
          request.setAttribute("exception", ErrorCode.WRONG_TYPE_TOKEN);
          e.printStackTrace();
        } catch(JwtException e){
            request.setAttribute("exception", ErrorCode.ACCESS_DENIED);
        }
        return false;
    }

    // token 유효성 , 만료일자 확인
    @Override
    public String validateRefreshToken(RefreshToken token){
        String refreshToken = token.getRefreshToken();

        try{
            //검증
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(refreshToken);

            //만료시간이 지나지 않았을 경우 access token 다시 발급
            if(!claims.getBody().getExpiration().before(new Date()))
                return recreationAccessToken(claims.getBody().get("sub").toString(), claims.getBody().get("role"));
        }catch (Exception e){
            //만료되었을 경우 로그인 필요
            return null;
        }
        return null;
    }

    //access token 다시 발급
    @Override
    public String recreationAccessToken(String userId, Object role){
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role);
        Date now = new Date();

        String accessToken = Jwts.builder().setClaims(claims)
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessTokenValidTime))
                .signWith(secretKey)
                .compact();

        return accessToken;
    }

    // JWT token에서 인증 정보 조회
    @Override
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    // token에서 회원 정보 추출
    @Override
    public String getUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 값 가져오기    "Authorization" : "token value"
    @Override
    public String resolveToken(HttpServletRequest request) {  // HttpServletRequest 라이브러리 추가할것
        return request.getHeader("Authorization");
    }
}