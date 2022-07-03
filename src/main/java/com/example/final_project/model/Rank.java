package com.example.final_project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
@AllArgsConstructor
public enum Rank {
    STAFF("사원"), SENIOR_STAFF("주임"), ASSISTANT_MANAGER("대리"),
    GENERAL_MANAGER("과장"), DEPUTY_MANAGER("차장"), SUPERVISOR("부장"),
    EXECUTIVE("임원");

    private final String name;

    private static final Map<String, Rank> BY_NAME =
            Stream.of(values()).collect(Collectors.toMap(Rank::getName, Function.identity()));

    public static Rank valueOfName(String name) {
        return BY_NAME.get(name);
    }
}
