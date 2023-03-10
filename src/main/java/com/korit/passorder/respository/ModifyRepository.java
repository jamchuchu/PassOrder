package com.korit.passorder.respository;

import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ModifyRepository {

    public int modifyUserPassword(UserMst userMst);

    public int modifyCafeInfo(CafeMst cafeMst);

}
