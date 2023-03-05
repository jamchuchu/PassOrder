package com.korit.passorder.web.api;

import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CafeService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cafe")
public class CafeApi {

    @Autowired
    CafeService cafeService;

    @GetMapping("/cafeId")
    public ResponseEntity<?> getCafeId(@AuthenticationPrincipal PrincipalDetails principal){
        int userId = principal.getUser().getUserId();
        int cafeId = cafeService.getCafeIdByUserId(userId);

        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cafeId));
    }



}
