package com.korit.passorder.respository;

import com.korit.passorder.entity.UserMst;
import com.korit.passorder.web.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int registerUser(UserDto userDto);
    public int findUserIdByUsername(String username);
    public UserMst findUserByUserId(int userId);

}
