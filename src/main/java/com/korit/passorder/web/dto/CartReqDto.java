package com.korit.passorder.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartReqDto {
    private String menuName;
    private int totalPrice;
    private String hotAndice;
    private boolean shotStatus;
    private boolean whipStatus;
}

