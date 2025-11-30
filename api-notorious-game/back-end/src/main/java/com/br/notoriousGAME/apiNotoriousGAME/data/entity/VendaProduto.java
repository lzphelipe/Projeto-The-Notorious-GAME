package com.br.notoriousGAME.apiNotoriousGAME.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vendas_produtos")
public class VendaProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVendaProduto;

    @ManyToOne
    @JoinColumn(name = "id_venda", nullable = false)
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "id_jogo",  nullable = false)
    private Jogo jogo;

    @Column(name = "preco_momento", nullable = false)
    private BigDecimal precoMomento;

    @Builder
    public VendaProduto(Venda venda, Jogo jogo, BigDecimal precoMomento) {
        this.venda = venda;
        this.jogo = jogo;
        this.precoMomento = precoMomento;
    }
}
