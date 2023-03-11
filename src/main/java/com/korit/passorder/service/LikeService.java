package com.korit.passorder.service;

import com.korit.passorder.entity.LikeMst;
import com.korit.passorder.respository.LikeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public void createLikeMst(int userId, int menuId, int cafeId) {

        LikeMst like = likeRepository.getLikeStatus(userId, menuId, cafeId);

        if (like != null) {
            likeRepository.deleteLike(userId, menuId, cafeId);
            System.out.println("삭제 성공");
        } else {
            likeRepository.addLike(userId, menuId, cafeId);
            System.out.println("추가 성공");
        }
    }

    public List<LikeMst> createLikeList(int userId, int cafeId){

        return likeRepository.getLikeList(userId, cafeId);

    }
}
