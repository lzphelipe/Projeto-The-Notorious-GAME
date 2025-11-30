package com.br.notoriousGAME.apiNotoriousGAME.controller;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.LoginRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.TokenResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<TokenResponseDTO> loginUsuario(@RequestBody @Valid LoginRequestDTO loginRequestDTO){
        var token = authService.logarUsuario(loginRequestDTO.email(), loginRequestDTO.senha());
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }
}
