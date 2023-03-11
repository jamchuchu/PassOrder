package com.korit.passorder.respository;


import com.korit.passorder.entity.LikeMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LikeRepository {

    public LikeMst getLikeStatus(int userId, int menuId, int cafeId);

    public int addLike(int userId, int menuId, int cafeId);

    public void deleteLike(int userId, int menuId, int cafeId);

    public List<LikeMst> getLikeList(int userId, int cafeId, int start);
}


//    int userId, int menuId, int cafeId