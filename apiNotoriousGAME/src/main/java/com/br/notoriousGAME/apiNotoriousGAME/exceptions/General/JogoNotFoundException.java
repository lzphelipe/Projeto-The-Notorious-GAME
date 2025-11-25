package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

public class JogoNotFoundException extends RuntimeException {
    public JogoNotFoundException(Long id) {
        super("Jogo com o id " + id + " não foi encontrado.");
    }
}
