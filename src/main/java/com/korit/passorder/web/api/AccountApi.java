package com.korit.passorder.web.api.account;

import com.korit.passorder.aop.annotation.ValidAspect;
import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.AccountService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;

    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {

        accountService.duplicateUsername(userMst.getUsername());
        accountService.compareToPassword(userMst.getPassword(), userMst.getRepassword());

        UserMst user = accountService.registerUser(userMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + user.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new User", user));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdminCafe(@RequestBody CafeMst cafeMst, BindingResult bindingResult) {

//        accountService.registerAdminAddCafe(userMst.getUserId(), cafeMst.getCafeId());


        System.out.println(cafeMst);

        CafeMst cafe = accountService.registerAdminAddCafe(cafeMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + cafe.getCafeId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new User", cafe));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId){
        UserMst userMst = accountService.findUserByUserId(userId);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.OK.value(), "success", userMst));
    }

    @GetMapping("/principal")
    public ResponseEntity<?> getUserbyPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails){
        UserMst userMst = principalDetails.getUser();
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.OK.value(), "success", userMst));
    }





}
