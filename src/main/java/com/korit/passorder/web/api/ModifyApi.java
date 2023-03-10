package com.korit.passorder.web.api;


import com.korit.passorder.aop.annotation.ParamsAspect;
import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.ModifyAdminService;
import com.korit.passorder.web.dto.CMRespDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin-account")
public class ModifyApi {

    @Autowired
    private ModifyAdminService modifyAdminService;

    @ParamsAspect
    @PatchMapping("/modify-admin")
    public ResponseEntity<CMRespDto<?>> modifyAdmin(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody UserMst userMst){

        userMst.setUserId(principalDetails.getUser().getUserId());
        modifyAdminService.modifyAdmin(userMst);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Modify Admin Password Successfully", true));
    }

    @ParamsAspect
    @PatchMapping("/modify-cafe-info")
    public ResponseEntity<CMRespDto<?>> modifyAdminInfo(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CafeMst cafeMst){


        cafeMst.setUserId(principalDetails.getUser().getUserId());
        modifyAdminService.modifyCafeInfo(cafeMst);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Modify Admin CafeInfo Successfully", true));
    }
}
