package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderMst {

    private int orderId;

    private int cafeId;

    private int userId;

    private LocalDateTime orderTime;

    private int totalPrice;

    private int complete;
}
