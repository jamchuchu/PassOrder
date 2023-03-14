package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderDtl {

    private int orderDtlId;

    private int orderId;

    private int menuId;

    private String status;

    private boolean shot;

    private boolean whip;

    private int cartId;
}
