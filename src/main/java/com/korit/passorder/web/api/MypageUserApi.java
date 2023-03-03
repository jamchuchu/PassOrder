package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ParamsAspect;
import com.korit.passorder.entity.CouponMst;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.MypageUserService;
import com.korit.passorder.web.dto.CMRespDto;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Api(tags = {"MypageUser Rest API Controller"})
@RestController
@RequestMapping("/api/mypage-user")
public class MypageUserApi {

    @Autowired
    private MypageUserService mypageUserService;

//    @ParamsAspect
//    @GetMapping("/sum")
//    public ResponseEntity<?> getSumPrice(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        // http://localhost:8000/api/mypage-user/sum?userId=11&cafeId=26&complete=1 -> @ParamsAspect
//        // @AuthenticationPrincipal PrincipalDetails principalDetails
//
//
//
////        int totalPrice = mypageUserService.getTotalPrice();
////        log.info("{}", "totalPrice: " + totalPrice);
//
//
//
//        return ResponseEntity
//                .ok()
//                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", totalPrice));
//    }

//    @ParamsAspect
//    @PatchMapping("/update-coupon")
//    public ResponseEntity<CMRespDto<?>>couponCountPatch(@RequestBody CouponMst couponMst) {
//
//        // CouponMst에서 userId와 cafeId를 가져와서 OrderMst에 설정합니다.
//        OrderMst orderMst = OrderMst.builder()
//                .userId(couponMst.getUserId())
//                .cafeId(couponMst.getCafeId())
//                .build();
//
//        // OrderMst에 필요한 값들을 설정합니다.
//        orderMst.setComplete(1); // complete 값은 1로 설정합니다.
//        int totalPrice = mypageUserService.getTotalPrice(orderMst);
//        int couponCount = totalPrice / 10; // totalPrice에서 10으로 나눈 몫을 couponCount로 설정합니다.
//        couponMst.setCouponCount(couponCount);
//
//        System.out.println("couponCount: " + couponCount);
//
//        // CouponMst를 업데이트합니다.
//        mypageUserService.updateCouponCount(couponMst);
//
//
//        return ResponseEntity
//                .ok()
//                .body(new CMRespDto<>(HttpStatus.OK.value(), "Patch CouponCount successfully", true));
//    }
//
//    @ParamsAspect
//    @PatchMapping("/update-complete")
//    public ResponseEntity<CMRespDto<?>>orderComplete(@RequestBody OrderMst orderMst) {
//
//        orderMst.setComplete(1);
//        mypageUserService.completeStatus(orderMst.getOrderId());
//        return ResponseEntity
//                .ok()
//                .body(new CMRespDto<>(HttpStatus.OK.value(), "Patch CouponCount successfully", true));
//    }
}
