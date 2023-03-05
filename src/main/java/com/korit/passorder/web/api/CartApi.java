package com.korit.passorder.web.api;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartApi {

    @Autowired
    CartService cartService;

    @Autowired
    MenuService menuService;

    @PostMapping("")
    public ResponseEntity<?> addCart(@RequestBody CartReqDto cartReqDto){
        System.out.println(cartReqDto);
//        int userId = principalDetails.getUser().getUserId()
        int userId = 13;
        int cafeId = 26;
        MenuMst menuMst = menuService.getMenuIdByMenuName(cafeId, cartReqDto.getMenuName());

        CartMst cartMst = CartMst.builder().
                userId(userId).
                menuId(menuMst.getMenuId()).
                status(cartReqDto.getHotAndice()).
                shot(cartReqDto.isShotStatus()).
                whip(cartReqDto.isWhipStatus()).
                totalPrice(cartReqDto.getTotalPrice()).
                build();

        cartService.createCart(cartMst);

        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(),"ok", cartMst));
    }
}
