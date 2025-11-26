package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.VendaProduto;

import java.math.BigDecimal;

public record VendaProdutoResponseDTO(
        String nomeJogo,
        BigDecimal precoPago
) {
    public VendaProdutoResponseDTO(VendaProduto produto){
        this(produto.getJogo().getNomeJogo(), produto.getPrecoMomento());
    }
}
