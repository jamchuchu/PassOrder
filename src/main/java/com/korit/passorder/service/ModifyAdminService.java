package com.korit.passorder.service;

import com.korit.passorder.entity.CafeMst;
import com.korit.passorder.entity.UserMst;
import com.korit.passorder.respository.AccountRepository;
import com.korit.passorder.respository.ModifyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ModifyAdminService {

    @Autowired
    private ModifyRepository modifyRepository;

    public void modifyAdmin(UserMst userMst){
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));

        modifyRepository.modifyUserPassword(userMst);
    }

    public void modifyCafeInfo(CafeMst cafeMst) {

        modifyRepository.modifyCafeInfo(cafeMst);
    }
}