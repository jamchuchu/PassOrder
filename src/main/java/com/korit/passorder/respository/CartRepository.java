package com.korit.passorder.respository;

import com.korit.passorder.entity.CartMst;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface CartRepository {

    public int createCart(CartMst cartMst);
    public CartMst getCartByCartId(int cartId, int userId);
    public List<CartMst> getCartByUser(int userId);
    public List<CartMst> getCartBycafeId(int cafeId, int userId);
    public List<CartMst> getCartBymenuId(int menuId, int userId);

    @Delete("delete from cartMst where cafe_id = #{cafeId} and user_id = #{userId}")
    public void deleteCartByCafeId(int cafeId, int userId);



}
