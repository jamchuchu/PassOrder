package com.korit.passorder.web.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AccountController {

    @GetMapping("/login")
    public String login(){
        return "index";

    }

    @ResponseBody
    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @GetMapping("/success")
    public String success(){
        return "indexSuccess";
    }

    @ResponseBody
    @GetMapping("/fail")
    public String fail(){
        return "fail";
    }


}