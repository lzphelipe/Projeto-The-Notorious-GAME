package com.br.notoriousGAME.apiNotoriousGAME;

import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.UsuarioNotFoundException;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import com.br.notoriousGAME.apiNotoriousGAME.service.UsuarioService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    @DisplayName("CT-003: Deve lançar erro ao consultar cliente inexistente")
    void testConsultarClienteInexistente() {
        // Quando buscar ID 99, retorna vazio
        Mockito.when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        // Verifica se lança a exceção correta (UsuarioNotFoundException)
        Assertions.assertThrows(UsuarioNotFoundException.class, () -> {
            usuarioService.listarUsuarioPorId(99L);
        });
    }
}
