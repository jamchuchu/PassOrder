package com.korit.passorder.service;

import com.korit.passorder.entity.OrderMst;
import com.korit.passorder.respository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public List<OrderMst> getAllOrdersList(int userId, int cafeId) {
        return orderRepository.getOrderList(userId, cafeId);
    }

    public OrderMst getOrderByOrderId(int orderId) {
        return orderRepository.findOrderByOrderId(orderId);
    }

    public void completeStatus(int orderId) {
        orderRepository.completeStatus(orderId);
    }
}

