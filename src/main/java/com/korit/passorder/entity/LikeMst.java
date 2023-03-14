package com.korit.passorder.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LikeMst {

    private Integer likeId;

    private int userId;

    private int menuId;

    private int cafeId;

}
