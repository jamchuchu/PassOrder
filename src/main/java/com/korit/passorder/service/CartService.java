package com.korit.passorder.service;

import com.korit.passorder.entity.CartMst;
import com.korit.passorder.respository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    public int createCart(CartMst cartMst){
        return cartRepository.createCart(cartMst);
    }

}
