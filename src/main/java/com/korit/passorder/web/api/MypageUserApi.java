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
import java.util.List;
import java.util.Map;

@Slf4j
@Api(tags = {"user mypage 정보관리 Api"})
@RestController
@RequestMapping("/api/mypage-user")
public class MypageUserApi {

    @Autowired
    private MypageUserService mypageUserService;

    @ParamsAspect
    @GetMapping("/user-order-list")
    public ResponseEntity<CMRespDto<List<OrderMst>>> getUserOrderList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        int userId = principalDetails.getUser().getUserId();
        System.out.println("USER_ID: " + userId);

        int cafeId = 26;
        System.out.println("CAFE_ID: " + cafeId);



        List<OrderMst> order = mypageUserService.OrderListForUser(userId, cafeId);

        System.out.println("ORDER: " + order);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", mypageUserService.OrderListForUser(userId, cafeId)));
    }


    @ParamsAspect
    @GetMapping("/coupon")
    public ResponseEntity<?> getCouponStatusEachCafe(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        int userId = principalDetails.getUser().getUserId();
        System.out.println("USER_ID: " + userId);

        int cafeId = 26;
        System.out.println("CAFE_ID: " + cafeId);

        CouponMst coupon = mypageUserService.getCouponMst(userId, cafeId);

        System.out.println("COUPON_INFO: " + coupon);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", coupon));
    }

    @ParamsAspect
    @GetMapping("/sum")
    public ResponseEntity<?> getSumPrice(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        int userId = principalDetails.getUser().getUserId();
        System.out.println("USER_ID: " + userId);

        int cafeId = 26;
        System.out.println("CAFE_ID: " + cafeId);

        int totalPrice = mypageUserService.getTotalPrice(userId, cafeId);

        System.out.println("totalPrice: " + totalPrice);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", totalPrice));
    }

    @ParamsAspect
    @PatchMapping("/update-coupon")
    public ResponseEntity<CMRespDto<?>>couponCountPatch(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        int userId = principalDetails.getUser().getUserId();
        System.out.println("USER_ID: " + userId);

        int cafeId = 26;
        System.out.println("CAFE_ID: " + cafeId);

        int couponCount = mypageUserService.getTotalPrice(userId, cafeId) / 10000;

        mypageUserService.updateCouponCount(userId, cafeId, couponCount);
        System.out.println("COUPON_COUNT: " + couponCount);


        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Patch CouponCount successfully", couponCount));
    }


}
