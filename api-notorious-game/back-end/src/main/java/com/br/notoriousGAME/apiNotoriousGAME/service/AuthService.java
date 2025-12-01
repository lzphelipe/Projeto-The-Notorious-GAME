package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.TokenResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.PasswordInvalidException;
import com.br.notoriousGAME.apiNotoriousGAME.infra.security.TokenService;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TokenResponseDTO logarUsuario(String email, String senha){
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Email não encontrado."));

        if (!passwordEncoder.matches(senha, usuario.getSenha())){
            throw new PasswordInvalidException("Senha incorreta!");
        }

        String token = tokenService.generateToken(usuario);
        return new TokenResponseDTO(token, usuario.getPerfil().toString());
    }
}
