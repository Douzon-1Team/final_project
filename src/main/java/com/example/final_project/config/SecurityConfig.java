package com.example.final_project.config;


import com.example.final_project.jwt.JwtAuthenticationEntryPoint;
import com.example.final_project.jwt.JwtAuthenticationFilter;
import com.example.final_project.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CorsFilter corsFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {  // 암호화에 필요한 PasswordEncoder를 Bean으로 등록
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(
                "/h2-console/**"
                , "/favicon.ico"
                , "/error"
        );
    }

    @Override
    protected void configure(HttpSecurity https) throws Exception {

        https.httpBasic().disable()  // rest api 고려해서 기본 설정은 해제
                .csrf().disable()  // csrf 보안 토큰 해제 처리
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이기에 세션 사용하지 않음 설정

                .and()
                .addFilterBefore(corsFilter, LogoutFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)

                .and()
                .authorizeRequests()  // 요청에 대한 사용권한 체크
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/report/**", "/accept/**", "/manager/**").hasAnyRole("MANAGER", "ADMIN")
                .antMatchers("/attendance/**", "/vacation/**", "/profile/**","/main/**", "/user/**", "/setting/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                .antMatchers("/**").permitAll()  // 그외 나머지 경로 요청은 누구나 접근 가능함

                .and()
                .requiresChannel()
                .antMatchers("/")
                .requiresSecure()

                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("refreshToken")
                .permitAll()

                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)

                .httpBasic();
    }
}