package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CategoriaRequestDTO(

        @NotBlank(message = "O nome da categoria é obrigatório.")
        String nomeCategoria,

        @NotBlank(message = "A descrição da categoria é obrigatória.")
        String descricao
) {
}
