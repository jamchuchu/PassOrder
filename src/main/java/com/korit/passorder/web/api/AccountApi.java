package com.korit.passorder.web.api;

import com.korit.passorder.aop.annotation.ValidAspect;
import com.korit.passorder.config.SecurityConfig;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.AccountService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
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
    public ResponseEntity<CMRespDto<UserMst>> register(@Valid @RequestBody UserMst userMst, BindingResult bindingResult) {
        accountService.registerUser(userMst);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "create user", userMst));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId){
        UserMst userMst = accountService.findUserByuserId(userId);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.OK.value(), "success", userMst));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserbyPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails){
        UserMst userMst = principalDetails.getUser();
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.OK.value(), "success", userMst));
    }


}
