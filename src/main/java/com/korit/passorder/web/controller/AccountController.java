package com.korit.passorder.web.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping({"", "/index"})
    public String login(){
        return "/index/index";
    }

    @GetMapping("/before-register")
    public String beforeRegister() {
        return "/register/beforeRegister";
    }

    @GetMapping("/register")
    public String register(){
        return "/register/register";
    }

}