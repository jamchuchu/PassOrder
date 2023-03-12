package com.korit.passorder.respository;

import com.korit.passorder.entity.OrderDtl;
import com.korit.passorder.entity.OrderMst;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface OrderRepository {

    public List<OrderMst> getOrderList(int userId, int cafeId);

    public OrderMst findOrderByOrderId(int orderId);

    public int completeStatus(OrderMst orderMst);

    public int createNewOrder(OrderMst orderMst);

    public int createNewOrderDtl(OrderDtl orderDtl);

    public List<OrderMst> getOrderListNotComplete(OrderMst orderMst);

    public List<OrderDtl> getOrderDtlList(int orderId);

    public List<OrderMst> getOrderbyAdmin(int cafeId, String start, String end);
    public List<OrderMst> getOrderGroupUserbyAdmin(int cafeId, String start, String end);

    }
