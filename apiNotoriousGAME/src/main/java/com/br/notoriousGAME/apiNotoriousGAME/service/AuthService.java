package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.UsuarioResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.EmailAlreadyExistsException;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.PasswordInvalidException;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioResponseDTO logarUsuario(String email, String senha){
        // Busca pelo email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new EmailAlreadyExistsException("Email não encontrado!"));

        // Verifica a senha
        if (usuario.getSenha().equals(senha)){
            throw new PasswordInvalidException("Senha incorreta!");
        }

        // Se passou, retorna os dados (O Front vai ler o Perfil aqui!)
        return new UsuarioResponseDTO(usuario);
    }
}
