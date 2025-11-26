package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

public class CategoriaNotFoundException extends RuntimeException {
    public CategoriaNotFoundException(Long id) {
        super("Categoria com o id " + id + " não foi encontrada.");
    }
}
