package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartMst {
    private int cartId;
    private int userId;
    private int menuId;
    private String status;
    private boolean shot;
    private boolean whip;
    private int totalPrice;
}
