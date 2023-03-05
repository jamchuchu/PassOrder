package com.korit.passorder.web.dto;

import com.korit.passorder.entity.MenuDtl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuReqDto {
    private String menuName;
    private int menuPrice;
    private String category;
    private String hotAndice;
    private boolean shotStatus;
    private boolean whipStatus;
    private int hotAndicePrice;
    private int shotPrice;
    private int whipPrice;

}
