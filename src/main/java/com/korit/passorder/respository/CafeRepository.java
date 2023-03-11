package com.korit.passorder.respository;

import com.korit.passorder.entity.CafeMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CafeRepository {

    public int getCafeIdByUserId(int userId);

    public CafeMst getCafeByUserId(int userId);
}
