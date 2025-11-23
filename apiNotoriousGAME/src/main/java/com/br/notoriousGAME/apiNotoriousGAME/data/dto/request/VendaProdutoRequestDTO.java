package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.NotNull;

public record VendaProdutoRequestDTO(

        @NotNull(message = "O ID do jogo é obrigatório")
        Long idJogo
) {
}
