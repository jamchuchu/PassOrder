package com.korit.passorder.web.advice;

import com.korit.passorder.exception.CustomValidationException;
import com.korit.passorder.web.dto.CMRespDto;
import com.nimbusds.oauth2.sdk.http.HTTPRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationError(CustomValidationException e){
        return ResponseEntity.badRequest().body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(),"Validation Error", e.getErrorMap() ));
    }

}
