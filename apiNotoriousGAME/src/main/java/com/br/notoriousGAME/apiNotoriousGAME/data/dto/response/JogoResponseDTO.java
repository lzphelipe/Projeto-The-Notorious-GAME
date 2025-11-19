package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;

import java.math.BigDecimal;

public record JogoResponseDTO(
        Long idJogo,
        String nomeJogo,
        String generoJogo,
        String desenvolvedoraJogo,
        BigDecimal precoJogo
) {
    public JogoResponseDTO(Jogo jogo){
        this(jogo.getIdJogo(), jogo.getNomeJogo(), jogo.getGeneroJogo(), jogo.getDesenvolvedoraJogo(), jogo.getPrecoJogo());
    }
}
