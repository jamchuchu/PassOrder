package com.korit.passorder.service;


import com.korit.passorder.entity.CouponMst;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.respository.MypageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MypageUserService {

    @Autowired
    MypageRepository mypageRepository;

    public List<OrderMst> OrderListForUser(int userId, int cafeId) {
        return mypageRepository.getUserOrderList(userId, cafeId);
    }

    public int getTotalPrice(int userId, int cafeId){
        int totalPrice = 0;
        if(mypageRepository.selectTotalPrice(userId, cafeId)!= null) {
            totalPrice = mypageRepository.selectTotalPrice(userId, cafeId);
        }
        return totalPrice;
    }

    public int updateCouponCount(int userId, int cafeId, int couponCount) {

        return mypageRepository.couponCountUpdate(userId, cafeId, couponCount);
    }


    public CouponMst getCouponMst(int userId, int cafeId){

        return mypageRepository.getCouponStatus(userId, cafeId);
    }

    public int createCouponMst(int userId, int cafeId){
        return mypageRepository.createCouponMst(userId, cafeId);
    }


}
