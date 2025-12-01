package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

public record TokenResponseDTO(
        String token,
        String perfil,
        Long idUsuario
) {}
