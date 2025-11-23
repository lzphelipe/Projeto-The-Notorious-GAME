package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record VendaAtualizarDTO(

        @NotNull(message = "O ID do usuário é obrigatório (mesmo que seja o mesmo)")
        Long idUsuario,

        @NotNull(message = "Informe a nova data da venda")
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataVenda,

        @NotNull(message = "O novo status é obrigatório")
        String statusVenda,

        @NotEmpty(message = "O carrinho não pode estar vazio")
        List<VendaProdutoRequestDTO> produtos
) {
}
