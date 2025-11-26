package com.br.notoriousGAME.apiNotoriousGAME.data.dto.response;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Categoria;

public record CategoriaResponseDTO(
        Long idCategoria,
        String nomeCategoria,
        String descricao
) {
    public CategoriaResponseDTO(Categoria categoria){
        this(categoria.getIdCategoria(), categoria.getNomeCategoria(), categoria.getDescricao());
    }
}
