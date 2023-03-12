package com.korit.passorder.web.api;

import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.CafeService;
import com.korit.passorder.web.dto.CMRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/cafe-info")
    public ResponseEntity<?> getCafeInfo(@AuthenticationPrincipal PrincipalDetails principal){

        int userId = principal.getUser().getUserId();

        CafeMst cafeInfo = cafeService.getCafeByUserId(userId);
        System.out.println("카페 정보: " + cafeInfo);

        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cafeInfo));

    }

    @GetMapping("/cafeId/{cafeId}")
    public ResponseEntity<?> getCafeforUser(@PathVariable int cafeId, @AuthenticationPrincipal PrincipalDetails principal){
        CafeMst cafeMst = cafeService.getCafebyCafeId(cafeId);
        return  ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "ok", cafeMst));
    }

}
