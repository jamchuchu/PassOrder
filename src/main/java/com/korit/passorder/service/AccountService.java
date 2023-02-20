package com.korit.passorder.service;

import com.korit.passorder.entity.UserMst;
import com.korit.passorder.respository.AccountRepository;
import com.korit.passorder.web.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public int registerUser(UserDto userDto){
        userDto.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));
        return accountRepository.registerUser(userDto);
    }

    public int findUserByUsername(String username){
        return accountRepository.findUserIdByUsername(username);
    }

    public UserMst findUserByuserId(int userId){
        return accountRepository.findUserByUserId(userId);
    }

}
