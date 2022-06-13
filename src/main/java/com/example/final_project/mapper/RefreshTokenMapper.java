package com.example.final_project.mapper;

import com.example.final_project.model.RefreshToken;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

public interface RefreshTokenMapper {

    @Insert("INSERT INTO refresh_token(refresh_token, empno) VALUES(#{refreshToken}, #{keyId})")
    int save(RefreshToken refreshToken);

    @Select("SELECT * FROM refresh_token WHERE refresh_token=#{refresh_token}")
    Optional<RefreshToken> findByRefreshToken(@Param("refresh_token") String refreshToken);

    @Select("SELECT EXISTS(SELECT 1 FROM refresh_token WHERE empno=#{empno})")
    boolean existsByKeyId(@Param("empno") String userId);

    @Delete("DELETE FROM refresh_token WHERE empno=#{empno}")
    void deleteByKeyId(@Param("empno") String userId);
}
