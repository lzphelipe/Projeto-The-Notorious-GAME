package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

public class VendaNotFoundException extends RuntimeException {
    public VendaNotFoundException(Long id) {
        super("Venda com o id " + id + " não foi encontrada.");
    }
}
