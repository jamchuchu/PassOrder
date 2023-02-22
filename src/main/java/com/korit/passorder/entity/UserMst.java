package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserMst {

    private int userId;
    @NotBlank
    private String username;
    @NotBlank
    private String password;

    private String repassword;
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;

    private int roleId;
    private String roleName;
}
