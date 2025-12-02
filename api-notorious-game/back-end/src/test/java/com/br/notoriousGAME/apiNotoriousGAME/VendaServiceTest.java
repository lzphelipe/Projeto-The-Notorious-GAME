package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaProdutoRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.VendaResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Venda;
import com.br.notoriousGAME.apiNotoriousGAME.repository.JogoRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.VendaProdutoRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.VendaRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class VendaServiceTest {

    @Mock private VendaRepository vendaRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private JogoRepository jogoRepository;
    @Mock private VendaProdutoRepository vendaProdutoRepository;

    @InjectMocks
    private VendaService vendaService;

    @Test
    @DisplayName("CT-001: Deve calcular o preço total corretamente ao criar uma venda")
    void testCalcularPrecoTotal() {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(1L);
        usuario.setNomeUsuario("Cliente Teste");

        // Simula dois jogos com preços definidos
        Jogo jogo1 = new Jogo();
        jogo1.setIdJogo(10L);
        jogo1.setPrecoJogo(new BigDecimal("100.00"));

        Jogo jogo2 = new Jogo();
        jogo2.setIdJogo(20L);
        jogo2.setPrecoJogo(new BigDecimal("50.50"));

        // Simula o Request (DTO) com esses 2 jogos
        VendaRequestDTO dto = new VendaRequestDTO(
                1L, // ID do Usuário
                List.of(
                        new VendaProdutoRequestDTO(10L), // ID Jogo 1
                        new VendaProdutoRequestDTO(20L)  // ID Jogo 2
                )
        );

        Mockito.when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        Mockito.when(vendaRepository.save(any(Venda.class))).thenAnswer(i -> i.getArguments()[0]);
        Mockito.when(jogoRepository.findById(10L)).thenReturn(Optional.of(jogo1));
        Mockito.when(jogoRepository.findById(20L)).thenReturn(Optional.of(jogo2));

        VendaResponseDTO resposta = vendaService.criarVenda(dto);

        assertNotNull(resposta);

        assertEquals(new BigDecimal("150.50"), resposta.precoTotal());

        assertEquals(2, resposta.produtos().size());
    }
}