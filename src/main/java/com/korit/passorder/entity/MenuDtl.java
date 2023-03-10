package com.korit.passorder.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuDtl {
    private int MenuDtlId;
    private int addPrice;
    private int menuId;
    private String addMenuName;
}
