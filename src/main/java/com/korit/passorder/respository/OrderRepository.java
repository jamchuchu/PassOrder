package com.korit.passorder.respository;

import com.korit.passorder.entity.OrderMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {

    public List<OrderMst> getOrderList(int userId, int cafeId);

    public OrderMst findOrderByOrderId(int orderId);

    public Integer completeStatus(int orderId);
}
