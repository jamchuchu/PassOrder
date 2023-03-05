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

    public List<MenuMst> getMenuByCategory(String category){
        return menuRepository.getMenuByCategory(category);
    };
    public List<MenuMst> getMenuByCafeId(int cafeId){
        return menuRepository.getMenuByCafeId(cafeId);
    };

    public List<String> getCategoriesByCafeId(int cafeId){
        return menuRepository.getCategoriesByCafeId(cafeId);
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

}
