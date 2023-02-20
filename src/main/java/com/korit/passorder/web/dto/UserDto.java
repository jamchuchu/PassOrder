package com.korit.passorder.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDto {
    private int userId;
    private String username;
    private String password;
    private String name;
    private String email;
    private int roleId;
}
