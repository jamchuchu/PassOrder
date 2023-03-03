package com.korit.passorder.respository;

import com.korit.passorder.entity.CouponMst;
import com.korit.passorder.entity.OrderMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageRepository {
    public Integer selectTotalPrice(OrderMst orderMst);

    public Integer couponCountUpdate(CouponMst couponMst);

    public Integer completeStatus(int orderId);
}
