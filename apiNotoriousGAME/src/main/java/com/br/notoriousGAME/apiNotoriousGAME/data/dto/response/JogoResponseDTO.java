package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Categoria;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;

import java.math.BigDecimal;

public record JogoResponseDTO(
        Long idJogo,
        String nomeJogo,
        CategoriaResponseDTO categoria,
        String desenvolvedoraJogo,
        BigDecimal precoJogo
) {
    public JogoResponseDTO(Jogo jogo){
        this(jogo.getIdJogo(), jogo.getNomeJogo(),new CategoriaResponseDTO(jogo.getCategoria()), jogo.getDesenvolvedoraJogo(), jogo.getPrecoJogo());
    }
}
