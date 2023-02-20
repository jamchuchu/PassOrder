package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ValidAspect;
import com.korit.passorder.config.SecurityConfig;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.service.AccountService;
import com.korit.passorder.web.dto.CMRespDto;
import com.korit.passorder.web.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/login")
public class AccountApi {

    @Autowired
    AccountService accountService;


    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
        accountService.registerUser(userDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "create user", userDto));
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<?> getUser(@PathVariable int userId, BindingResult bindingResult){
//        UserMst userMst = accountService.findUserByuserId(userId);
//        return ResponseEntity
//                .created(null)
//                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "create user", userMst));
//    }


}
