package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record VendaRequestDTO(

        @NotNull(message = "O ID do usuário é obrigatório")
        Long idUsuario,

        @NotEmpty(message = "O carrinho não pode estar vazio")
        List<VendaProdutoRequestDTO> produtos
) {
}
