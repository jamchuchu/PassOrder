package com.korit.passorder.service;

import com.korit.passorder.entity.MenuDtl;
import com.korit.passorder.entity.MenuMst;
import com.korit.passorder.respository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    public int createMenu(MenuMst menuMst){
        return menuRepository.createMenu(menuMst);
        // menudtl 함께 추가
    };
    public MenuMst getMenuByMenuId(int menuId){
        return menuRepository.getMenuByMenuId(menuId);
    };
    public List<MenuMst> getMenuByCategory(int cafeId, String category){
        return menuRepository.getMenuByCategory(cafeId, category);
    };
    public List<MenuMst> getMenuByCafeId(int cafeId){
        return menuRepository.getMenuByCafeId(cafeId);
    };
    public List<String> getCategoriesByCafeId(int cafeId){
        return menuRepository.getCategoriesByCafeId(cafeId);
    }
    public MenuMst getMenuIdByMenuName(int cafeId, String menuName){
        return menuRepository.getMenuIdByMenuName(cafeId, menuName);
    }


    //menudtl 추가
    public void createMenuDtls(List<MenuDtl> menuDtlList){
        for(MenuDtl dtl : menuDtlList){
            createMenuDtl(dtl);
        }
    }

    public int createMenuDtl(MenuDtl menuDtl){
        return menuRepository.createMenuDtl(menuDtl);
    }
    public List<MenuDtl> getMenuDtlByMenuId(int menuId){
        return menuRepository.getMenuDtlByMenuId(menuId);
    }

    public int deleteMenu(int menuId){
        return menuRepository.deleteMenu(menuId);
    }
    public int deleteMenuDtl(int menuId){
        return menuRepository.deleteMenuDtl(menuId);
    }

    public void modifyMenuMst(MenuMst menuMst){
        menuRepository.modifyMenuMst(menuMst);
        menuMst.getMenuDtlList().forEach(dtl -> {
            modifyMenuDtl(dtl);
        });
    }

    public int modifyMenuDtl(MenuDtl menuDtl){
        return menuRepository.modifyMenuDtl(menuDtl);
    }



}
