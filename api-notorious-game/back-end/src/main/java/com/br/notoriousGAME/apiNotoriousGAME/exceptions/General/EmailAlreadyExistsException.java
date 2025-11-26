package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
