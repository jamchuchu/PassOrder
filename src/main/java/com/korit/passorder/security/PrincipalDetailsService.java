package com.korit.passorder.security;

import com.korit.passorder.entity.UserMst;
import com.korit.passorder.respository.AccountRepository;
import com.korit.passorder.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    AccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 해당 username이 DB(user_mst table)에 존재하는지 확인!
        int userId = accountService.findUserByUsername(username);

        if (userId == 0) {
            throw new UsernameNotFoundException("회원정보를 확인 할 수 없음");
        }

        return new PrincipalDetails(accountService.findUserByuserId(userId));
    }

}
