package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

public class UsuarioNotFoundException extends RuntimeException {
    public UsuarioNotFoundException(Long id) {
        super("Usuário com o id " + id + " não foi encontrado.");
    }
}
