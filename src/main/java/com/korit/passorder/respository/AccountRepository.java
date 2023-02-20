package com.korit.passorder.respository;

import com.korit.passorder.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int registerUser(UserMst userMst);
    public int findUserIdByUsername(String username);
    public UserMst findUserByUserId(int userId);

}
