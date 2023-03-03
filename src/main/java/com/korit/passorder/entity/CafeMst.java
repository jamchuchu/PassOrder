package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CafeMst {

    private int cafeId;

    @NotBlank
    private String cafeName;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;

    private LocalDateTime openTime;
    private LocalDateTime closeTime;

    private int userId;



}
