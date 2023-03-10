package com.korit.passorder.service;

import com.korit.passorder.entity.CartMst;
import com.korit.passorder.entity.OrderDtl;
import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.respository.CartRepository;
import com.korit.passorder.respository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartRepository cartRepository;


    public List<OrderMst> getAllOrdersList(int userId, int cafeId) {
        return orderRepository.getOrderList(userId, cafeId);
    }

    public OrderMst getOrderByOrderId(int orderId) {
        return orderRepository.findOrderByOrderId(orderId);
    }

    public void completeStatus(OrderMst orderMst) {
        orderRepository.completeStatus(orderMst);
    }

    public List<OrderMst> getOrderMstListNotCompleted(OrderMst orderMst) {
        return orderRepository.getOrderListNotComplete(orderMst);
    }

    public List<OrderDtl> getOrderDtlListNotCompleted(int orderId) {
        return orderRepository.getOrderDtlList(orderId);
    }

    public List<OrderMst> createNewOrder(int cafeId, int userId) {
        // 주문 생성 시간
        LocalDateTime orderTime = LocalDateTime.now();

        List<CartMst> cartMstList = cartRepository.getCartBycafeId(cafeId, userId);
        int totalPrice = cartMstList.stream().mapToInt(CartMst::getTotalPrice).sum();

        OrderMst orderMst = OrderMst.builder()
                .cafeId(cafeId)
                .userId(userId)
                .orderTime(orderTime)
                .totalPrice(totalPrice)
                .complete(0)
                .build();

        orderRepository.createNewOrder(orderMst);

        // 해당 유저의 카트 삭제
        cartRepository.deleteCartByCafeId(cafeId, userId);

        // OrderDtl 생성
        List<OrderDtl> orderDtlList = new ArrayList<>();
        int orderId = orderMst.getOrderId();
        for (CartMst cartMst : cartMstList) {
            OrderDtl orderDtl = OrderDtl.builder()
                    .orderId(orderId)
                    .menuId(cartMst.getMenuId())
                    .status(cartMst.getStatus())
                    .shot(cartMst.isShot())
                    .whip(cartMst.isWhip())
                    .cartId(cartMst.getCartId())
                    .build();
            orderDtlList.add(orderDtl);
            orderRepository.createNewOrderDtl(orderDtl);
        }

        return Collections.singletonList(orderMst);
    }
}

