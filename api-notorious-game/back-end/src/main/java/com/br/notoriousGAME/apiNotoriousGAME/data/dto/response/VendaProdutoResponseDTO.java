package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.VendaProduto;

import java.math.BigDecimal;

public record VendaProdutoResponseDTO(
        Long idJogo,
        String nomeJogo,
        BigDecimal precoPago
) {
    public VendaProdutoResponseDTO(VendaProduto produto){
        this(produto.getJogo().getIdJogo(), produto.getJogo().getNomeJogo(), produto.getPrecoMomento());
    }
}
