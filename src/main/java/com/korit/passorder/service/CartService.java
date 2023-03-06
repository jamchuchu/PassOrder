package com.korit.passorder.service;

import com.korit.passorder.entity.CartMst;
import com.korit.passorder.respository.CartRepository;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    public int createCart(CartMst cartMst){
        return cartRepository.createCart(cartMst);
    }
    public CartMst getCartByCartId(int cartId, int userId){
        return cartRepository.getCartByCartId(cartId, userId);
    }

    public List<CartMst> getCartByUser(int userId){
        return cartRepository.getCartByUser(userId);
    }
    public List<CartMst> getCartBycafeId(int cafeId, int userId){
        return cartRepository.getCartBycafeId(cafeId, userId);
    }

    public List<CartMst> getCartBymenuId(int cartId, int userId){
        return cartRepository.getCartBymenuId(cartId, userId);
    }


}
