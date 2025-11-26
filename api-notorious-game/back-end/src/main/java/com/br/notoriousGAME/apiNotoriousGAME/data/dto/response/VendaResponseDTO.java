package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Venda;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record VendaResponseDTO(
        Long idVenda,
        String nomePessoa,
        LocalDate dataVenda,
        BigDecimal precoTotal,
        String statusVenda,
        List<VendaProdutoResponseDTO> produtos
) {
    public VendaResponseDTO(Venda venda, List<VendaProdutoResponseDTO> produtos){
        this(
                venda.getIdVenda(),
                venda.getUsuario().getNomeUsuario(),
                venda.getDataVenda(),
                venda.getPrecoTotal(),
                venda.getStatusVenda(),
                produtos
        );
    }
}
