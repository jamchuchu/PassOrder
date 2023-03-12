package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ParamsAspect;
import com.korit.passorder.entity.CartMst;
import com.korit.passorder.entity.OrderDtl;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.respository.CartRepository;
import com.korit.passorder.respository.OrderRepository;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CafeService;
import com.korit.passorder.service.CartService;
import com.korit.passorder.service.OrderService;
import com.korit.passorder.web.dto.CMRespDto;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Api(tags = {"Rest API Controller For Order"})
@RestController
@RequestMapping("/api/order")
public class OrderApi {
    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    CafeService cafeService;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartRepository cartRepository;

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

    @GetMapping("/order-list-uncompleted")
    public ResponseEntity<CMRespDto<?>> getOrderListUncompleted(OrderMst orderMst) {

        List<OrderMst> uncompleted = orderService.getOrderMstListNotCompleted(orderMst);
        System.out.println("uncompletedList: " + uncompleted);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Get Uncompleted OrderList Successfully", uncompleted));
    }

    @GetMapping("/order-dtl-list-uncompleted/{orderId}")
    public ResponseEntity<CMRespDto<?>> getOrderDtlListForAdmin(@PathVariable int orderId) {
        OrderMst orderMst = new OrderMst();
        orderMst.setOrderId(orderId);

        List<OrderDtl> orderDtlList = orderService.getOrderDtlListNotCompleted(orderMst.getOrderId());

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Get OrderDtlList Successfully", orderDtlList));
    }

    @ParamsAspect
    @PatchMapping("/update-complete")
    public ResponseEntity<CMRespDto<?>>orderComplete(@RequestBody OrderMst orderMst) {
        orderService.completeStatus(orderMst);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Patch OrderStatus successfully", true));
    }

    @PostMapping("/create-order")
    public ResponseEntity<CMRespDto<List<OrderMst>>> createNewOrder(@RequestBody List<CartMst> cartMstList) {

        int cafeId = cartMstList.get(0).getCafeId(); // 첫 번째 카트의 cafeId를 사용
        int userId = cartMstList.get(0).getUserId(); // 첫 번째 카트의 userId를 사용

        List<OrderMst> orderList = orderService.createNewOrder(cafeId, userId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Create Order Successfully", orderList));
    }

    @GetMapping("")
    public ResponseEntity<CMRespDto<?>> getOrderbyAdmin(@AuthenticationPrincipal PrincipalDetails principal, @RequestParam String startDate, @RequestParam String endDate) {
        int userId =  principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<OrderMst> orderList= orderService.getOrderbyAdmin(cafeId, startDate, endDate);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Get OrderDtlList Successfully", orderList));
    }

    @GetMapping("/groupUser")
    public ResponseEntity<CMRespDto<?>> getOrderGroupUserbyAdmin(@AuthenticationPrincipal PrincipalDetails principal, @RequestParam String startDate, @RequestParam String endDate) {
        int userId =  principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<OrderMst> orderList= orderService.getOrderGroupUserbyAdmin(cafeId, startDate, endDate);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Get OrderDtlList Successfully", orderList));
    }

}
