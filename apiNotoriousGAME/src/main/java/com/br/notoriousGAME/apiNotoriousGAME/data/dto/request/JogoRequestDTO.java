package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record JogoRequestDTO(

        @NotBlank(message = "O nome do jogo é obrigatório.")
        String nomeJogo,

        @NotBlank(message = "O jogo tem que ter um genêro.")
        String generoJogo,

        @NotBlank(message = "O jogo tem que ter uma desenvolvedora.")
        String desenvolvedoraJogo,

        @NotBlank(message = "O preço do jogo é obrigatório.")
        BigDecimal precoJogo

) {
}
