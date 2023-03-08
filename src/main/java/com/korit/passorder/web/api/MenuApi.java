package com.korit.passorder.web.api;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CafeService;
import com.korit.passorder.service.MenuService;
import com.korit.passorder.web.dto.CMRespDto;
import com.korit.passorder.web.dto.MenuReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuApi {
    @Autowired
    MenuService menuService;

    @Autowired
    CafeService cafeService;


    @PostMapping()
    public ResponseEntity<?> createMenu(@RequestBody MenuReqDto menuReqDto){
        List<MenuDtl> menuDtls = new ArrayList<>();

        MenuMst menuMst = MenuMst.builder().
                cafeId("26").
                menuName(menuReqDto.getMenuName()).
                category(menuReqDto.getCategory()).
                menuPrice(menuReqDto.getMenuPrice())
                .build();

        menuService.createMenu(menuMst);

        List<MenuDtl> menuDtlList = new ArrayList<>();

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.getHotAndice()).
                addPrice(menuReqDto.getHotAndicePrice()).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isShotStatus()?"shotAdd" : "shotNone").
                addPrice(menuReqDto.isShotStatus()? menuReqDto.getShotPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuDtlList.add(MenuDtl.builder().
                addMenuName(menuReqDto.isWhipStatus()?"whipAdd" : "whipNone").
                addPrice(menuReqDto.isWhipStatus()? menuReqDto.getWhipPrice(): 0).
                menuId(menuMst.getMenuId()).build());

        menuMst.setMenuDtlList(menuDtlList);
        menuService.createMenuDtls(menuDtlList);


//        }
        return  ResponseEntity.created(null).body(new CMRespDto<>(HttpStatus.CREATED.value(), "ok", menuReqDto));
    }

    @GetMapping("/menuId/{menuId}")
    public ResponseEntity<?> getMenuByMenuId(@PathVariable int menuId){
        MenuMst menuMst = menuService.getMenuByMenuId(menuId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }

    @GetMapping("/{category}")
    public ResponseEntity<?> getMenuByCategoryForAdmin(@AuthenticationPrincipal PrincipalDetails principal, @PathVariable String category){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<MenuMst> menuMstList = menuService.getMenuByCategory(cafeId ,category);

        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/admin/cafeId")
    public ResponseEntity<?> getMenuByCafeIdForAdmin(@AuthenticationPrincipal PrincipalDetails principal){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<MenuMst> menuMstList = menuService.getMenuByCafeId(cafeId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/cafeId/{cafeId}")
    public ResponseEntity<?> getMenuByCafeId(@PathVariable int cafeId){
        List<MenuMst> menuMstList = menuService.getMenuByCafeId(cafeId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMstList));
    }

    @GetMapping("/category")
    public ResponseEntity<?> getCategories(@AuthenticationPrincipal PrincipalDetails principal){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);
        List<String> category = menuService.getCategoriesByCafeId(cafeId);
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", category));
    }

    @GetMapping("/user/menuname")
    public ResponseEntity<?> getMenuByCafeId(@RequestParam String menuName){
        System.out.println(menuName);
        int cafeId = 26;
        MenuMst menuMst = menuService.getMenuIdByMenuName(cafeId, menuName);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuMst));
    }
//    @GetMapping("/{cafeId}")
//    public ResponseEntity<?> getMenuByCafeId(@PathVariable int cafeId){
//        return menuService.getMenuByCafeId(cafeId);
//    }

    @PostMapping("/menuDtl")
    public ResponseEntity<?> createMenuDtl(@RequestBody  MenuDtl menuDtl) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", menuDtl));
    }
}
