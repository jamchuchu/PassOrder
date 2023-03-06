package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ParamsAspect;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.OrderService;
import com.korit.passorder.web.dto.CMRespDto;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Api(tags = {"Rest API Controller For Order"})
@RestController
@RequestMapping("/api/order")
public class OrderApi {
    @Autowired
    private OrderService orderService;

    @ParamsAspect
    @GetMapping("/order-list")
    public ResponseEntity<CMRespDto<List<OrderMst>>> getOrderList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        int userId = principalDetails.getUser().getUserId();
        System.out.println("USER_ID: " + userId);

        int cafeId = 26;
        System.out.println("CAFE_ID: " + cafeId);



        List<OrderMst> order = orderService.getAllOrdersList(userId, cafeId);

        System.out.println("ORDER: " + order);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", orderService.getAllOrdersList(userId, cafeId)));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<CMRespDto<?>> getOrderOne(@PathVariable int orderId) {

        OrderMst order = orderService.getOrderByOrderId(orderId);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", order));
    }

    @ParamsAspect
    @PatchMapping("/update-complete/{orderId}")
    public ResponseEntity<CMRespDto<?>>orderComplete(OrderMst orderMst, @PathVariable int orderId) {
        orderService.completeStatus(orderMst.getOrderId());

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Patch OrderStatus successfully", true));
    }
}
