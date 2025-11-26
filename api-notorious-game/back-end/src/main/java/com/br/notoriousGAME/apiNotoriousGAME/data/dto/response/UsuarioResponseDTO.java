package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Perfil;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;

public record UsuarioResponseDTO(
        Long idUsuario,
        String nomeUsuario,
        String cpf,
        String email,
        Perfil perfil
) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(
                usuario.getIdUsuario(),
                usuario.getNomeUsuario(),
                usuario.getCpf(),
                usuario.getEmail(),
                usuario.getPerfil()
        );
    }
}
