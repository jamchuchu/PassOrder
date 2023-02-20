package com.korit.passorder.service;

import com.korit.passorder.entity.UserMst;
import com.korit.passorder.respository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public int registerUser(UserMst userMst){
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));
        System.out.println(userMst);
        return accountRepository.registerUser(userMst);
    }

    public int findUserByUsername(String username){
        return accountRepository.findUserIdByUsername(username);
    }

    public UserMst findUserByuserId(int userId){
        return accountRepository.findUserByUserId(userId);
    }

}
