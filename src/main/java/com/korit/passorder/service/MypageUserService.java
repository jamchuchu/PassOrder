package com.korit.passorder.service;

import com.korit.passorder.entity.CouponMst;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.respository.MypageRepository;
import com.mysql.cj.x.protobuf.MysqlxCrud;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MypageUserService {

    @Autowired
    MypageRepository mypageRepository;

    public int getTotalPrice(int userId, int cafeId){
        OrderMst orderMst = new OrderMst();

        orderMst.setUserId(userId);
        orderMst.setCafeId(cafeId);

        return mypageRepository.selectTotalPrice(orderMst);
    }

    public void updateCouponCount(CouponMst couponMst) {

        mypageRepository.couponCountUpdate(couponMst);
    }

    public void completeStatus(int userId) {
        mypageRepository.completeStatus(userId);
    }
}
