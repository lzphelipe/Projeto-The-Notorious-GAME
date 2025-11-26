package com.br.notoriousGAME.apiNotoriousGAME.data.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UsuarioRequestDTO(

        @NotBlank(message = "O nome é obrigatório")
        String nomeUsuario,

        @NotBlank(message = "O CPF é obrigatório")
        @Pattern(regexp = "\\d{11}", message = "O CPF deve conter exatamente 11 números.")
        String cpf,

        @NotBlank(message = "O E-mail é obrigatório")
        @Email(message = "Formato de e-mail inválido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        String senha
) {
}
