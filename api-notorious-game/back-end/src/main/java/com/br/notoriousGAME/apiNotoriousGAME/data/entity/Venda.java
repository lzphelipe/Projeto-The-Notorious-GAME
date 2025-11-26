package com.br.notoriousGAME.apiNotoriousGAME.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Venda" )
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenda;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @Column(name = "dataVenda", nullable = false)
    private LocalDate dataVenda;

    @Column(name = "precoTotal", nullable = false)
    private BigDecimal precoTotal;

    @Column(name = "statusVenda", nullable = false, length = 50)
    private String statusVenda;

    @Builder
    public Venda(Usuario usuario) {
        this.usuario = usuario;
        this.dataVenda = LocalDate.now();
        this.precoTotal = BigDecimal.ZERO;
        this.statusVenda = "PENDENTE";
    }

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<VendaProduto> produtos;

    public List<VendaProduto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<VendaProduto> produtos) {
        this.produtos = produtos;
    }
}
