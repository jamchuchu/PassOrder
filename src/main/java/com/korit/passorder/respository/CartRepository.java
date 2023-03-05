package com.korit.passorder.respository;

import com.korit.passorder.entity.CartMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartRepository {

    public int createCart(CartMst cartMst);
}
