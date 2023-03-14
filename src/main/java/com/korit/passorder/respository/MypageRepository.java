package com.korit.passorder.respository;

import com.korit.passorder.entity.CouponMst;
import com.korit.passorder.entity.OrderMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MypageRepository {
    public Integer selectTotalPrice(int userId, int cafeId);

    public Integer couponCountUpdate(int userId, int cafeId, int couponCount);

    public CouponMst getCouponStatus(int userId, int cafeId);

    public List<OrderMst> getUserOrderList (int userId, int cafeId);

    public int createCouponMst (int userId, int cafeId);
}
