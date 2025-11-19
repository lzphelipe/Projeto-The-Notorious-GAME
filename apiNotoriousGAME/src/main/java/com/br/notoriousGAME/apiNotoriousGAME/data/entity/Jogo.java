package com.br.notoriousGAME.apiNotoriousGAME.data.entity;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.JogoRequestDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "Jogos")
public class Jogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idJogo;

    @Column(name = "nome", nullable = false, length = 50)
    private String nomeJogo;

    @Column(name = "genero", nullable = false, length = 50)
    private String desenvolvedoraJogo;

    @Column(name = "preco", nullable = false)
    private BigDecimal precoJogo;

    @Builder
    public Jogo(JogoRequestDTO jogoRequestDTO) {
        this.nomeJogo = jogoRequestDTO.nomeJogo();
        this.desenvolvedoraJogo = jogoRequestDTO.desenvolvedoraJogo();
        this.precoJogo = jogoRequestDTO.precoJogo();
    }
}
