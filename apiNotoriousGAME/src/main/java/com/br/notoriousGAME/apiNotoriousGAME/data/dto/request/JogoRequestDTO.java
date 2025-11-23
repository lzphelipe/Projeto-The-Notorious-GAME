package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record JogoRequestDTO(

        @NotBlank(message = "O nome do jogo é obrigatório.")
        String nomeJogo,

        @NotBlank(message = "A categoria é obrigatória.")
        String nomeCategoria,

        @NotBlank(message = "o nome da desenvolvedora é obrigatório.")
        String desenvolvedoraJogo,

        @NotNull(message = "O preço do jogo é obrigatório.")
        BigDecimal precoJogo

) {
}
