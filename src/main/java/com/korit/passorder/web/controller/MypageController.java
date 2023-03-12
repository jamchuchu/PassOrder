package com.korit.passorder.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MypageController {

    @GetMapping("/user")
    public String mypageUser() {
        return "mypage/userMypage";
    }

    @GetMapping("/admin")
    public String mypageAdmin() {
        return "mypage/adminMypage";
    }

    @GetMapping("/admin-order-management")
    public String mypageOrderManagement() {
        return "admin/orderManagement";
    }

    @GetMapping("/user-modify")
    public String modifyUser() {
        return "modify/userModify";
    }

    @GetMapping("/admin-modify")
    public String modifyAdmin() {
        return "modify/adminModify";
    }

    @GetMapping("/sale-manage")
    public String saleManage() {
        return "mypage/saleManage";
    }


}
