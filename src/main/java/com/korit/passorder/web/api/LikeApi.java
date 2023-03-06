package com.korit.passorder.web.api;


import com.korit.passorder.aop.annotation.ParamsAspect;
import com.korit.passorder.entity.LikeMst;
import com.korit.passorder.security.PrincipalDetails;
import com.korit.passorder.service.LikeService;
import com.korit.passorder.web.dto.CMRespDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class LikeApi {

    @Autowired
    private LikeService likeService;

    @ParamsAspect
    @PostMapping("/like")
    public ResponseEntity<? extends CMRespDto<?>> like (@RequestBody LikeMst likeMst, BindingResult bindingResult){


        likeService.createLikeMst(likeMst.getUserId(), likeMst.getMenuId(), likeMst.getCafeId());

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"successfully",true));
    }

    @GetMapping("/like-list")
    public ResponseEntity<? extends CMRespDto<List<LikeMst>>> likeList(@AuthenticationPrincipal PrincipalDetails principalDetails){

        int userId = principalDetails.getUser().getUserId();
        int cafeId = 26;


        List<LikeMst> likeMstList = likeService.createLikeList(userId, cafeId);
        System.out.println(likeMstList);

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "likeMstList set 성공",likeMstList));

    }

}
