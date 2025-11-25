package com.br.notoriousGAME.apiNotoriousGAME.exceptions.General;

import com.br.notoriousGAME.apiNotoriousGAME.exceptions.RestErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GeneralExceptionHandler {

    @ExceptionHandler(JogoNotFoundException.class)
    private ResponseEntity<RestErrorMessage> entityNotFoundHandler(JogoNotFoundException exceptionJogo) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.BAD_REQUEST, exceptionJogo.getMessage());
        return ResponseEntity.status(errorMessage.status()).body(errorMessage);
    }

    @ExceptionHandler(JogoAlreadyExistsException.class)
    private ResponseEntity<RestErrorMessage> JogoAlreadyExistsExceptionHandler(JogoAlreadyExistsException exceptionJogo) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.CONFLICT, exceptionJogo.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(CategoriaNotFoundException.class)
    private ResponseEntity<RestErrorMessage> entityNotFoundHandler(CategoriaNotFoundException exceptionCategoria) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.NOT_FOUND, exceptionCategoria.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(CategoriaAlreadyExistsException.class)
    private ResponseEntity<RestErrorMessage> CategoriaAlreadyExistsHandler(CategoriaAlreadyExistsException exceptionCategoria) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.CONFLICT, exceptionCategoria.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(VendaNotFoundException.class)
    private ResponseEntity<RestErrorMessage> entityNotFoundHandler(VendaNotFoundException exceptionVenda) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.BAD_REQUEST, exceptionVenda.getMessage());
        return ResponseEntity.status(errorMessage.status()).body(errorMessage);
    }

    @ExceptionHandler(UsuarioNotFoundException.class)
    private ResponseEntity<RestErrorMessage> entityNotFoundHandler(UsuarioNotFoundException exceptionUsuario) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.BAD_REQUEST, exceptionUsuario.getMessage());
        return ResponseEntity.status(errorMessage.status()).body(errorMessage);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<RestErrorMessage> handleNoResourceFoundException(NoResourceFoundException exception) {
        RestErrorMessage errorMessage = new RestErrorMessage(HttpStatus.NOT_FOUND, "O recurso ou URL não foi encontrado. Verifique o endereço e o ID.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<RestErrorMessage> handleJsonError(HttpMessageNotReadableException exception) {

        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.BAD_REQUEST,
                "O corpo da requisição (JSON) está inválido ou mal formatado. Verifique erros de sintaxe, vírgulas ou tipos de dados errados."
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<List<RestErrorMessage>> methodArgumentNotValid(MethodArgumentNotValidException exception) {
        List<RestErrorMessage> errors = exception.getBindingResult().getFieldErrors()
                .stream().map(fieldError -> new RestErrorMessage(HttpStatus.BAD_REQUEST, fieldError.getDefaultMessage()))
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
