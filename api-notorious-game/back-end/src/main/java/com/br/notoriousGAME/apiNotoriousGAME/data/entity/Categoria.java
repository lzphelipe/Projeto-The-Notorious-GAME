package com.br.notoriousGAME.apiNotoriousGAME.data.entity;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.CategoriaRequestDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    @Column(name = "nome", nullable = false, length = 100, unique = true)
    private String nomeCategoria;

    @Column(name = "descricao", nullable = false, length = 300)
    private String descricao;

    @Builder
    public Categoria(CategoriaRequestDTO categoriaRequestDTO) {
        this.nomeCategoria = categoriaRequestDTO.nomeCategoria();
        this.descricao = categoriaRequestDTO.descricao();
    }
}
