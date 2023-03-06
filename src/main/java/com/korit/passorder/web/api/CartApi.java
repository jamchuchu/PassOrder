package com.korit.passorder.web.api;
import java.util.*;

import com.korit.passorder.entity.CartMst;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CartService;
import com.korit.passorder.service.MenuService;
import com.korit.passorder.web.dto.CMRespDto;
import com.korit.passorder.web.dto.CartReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartApi {

    @Autowired
    CartService cartService;

    @Autowired
    MenuService menuService;

    @PostMapping("")
    public ResponseEntity<?> addCart(@AuthenticationPrincipal PrincipalDetails pricipal, @RequestBody CartReqDto cartReqDto){
        System.out.println(cartReqDto);
        int userId = pricipal.getUser().getUserId();
//        int userId = 13;
        int cafeId = 26;
        MenuMst menuMst = menuService.getMenuIdByMenuName(cafeId, cartReqDto.getMenuName());

        CartMst cartMst = CartMst.builder().
                userId(userId).
                cafeId(cafeId).
                menuId(menuMst.getMenuId()).
                status(cartReqDto.getHotAndice()).
                shot(cartReqDto.isShotStatus()).
                whip(cartReqDto.isWhipStatus()).
                totalPrice(cartReqDto.getTotalPrice()).
                build();

        cartService.createCart(cartMst);

        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(),"ok", cartMst));
    }

    @GetMapping("/cartId/{cartId}")
    public ResponseEntity<?> getCartBycartId(@PathVariable int cartId, @AuthenticationPrincipal PrincipalDetails pricipal){
//        int userId = pricipal.getUser().getUserId();
        int userId = 13;
        CartMst cartMst = cartService.getCartByCartId(cartId, userId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cartMst));
    }

    @GetMapping("/userId")
    public ResponseEntity<?> getCartByUser(@AuthenticationPrincipal PrincipalDetails pricipal){
//        int userId = pricipal.getUser().getUserId();
        int userId = 13;
        List<CartMst> cartMst = cartService.getCartByUser(userId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cartMst));
    }

    @GetMapping("/cafeId/{cafeId}")
    public ResponseEntity<?> getCartBycafeId(@PathVariable int cafeId, @AuthenticationPrincipal PrincipalDetails pricipal){
//        int userId = pricipal.getUser().getUserId();
        int userId = 13;
        List<CartMst> cartMst = cartService.getCartBycafeId(cafeId, userId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cartMst));
    }

    @GetMapping("/menuId/{menuId}")

    public ResponseEntity<?> getCartBymenuId(@PathVariable int menuId, @AuthenticationPrincipal PrincipalDetails pricipal){
//        int userId = pricipal.getUser().getUserId();
        int userId = 13;
        List<CartMst> cartMst = cartService.getCartBymenuId(menuId, userId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cartMst));
    }
    
}
