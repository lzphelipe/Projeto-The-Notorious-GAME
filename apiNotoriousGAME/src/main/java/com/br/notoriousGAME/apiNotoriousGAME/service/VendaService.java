package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaAtualizarDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.VendaProdutoResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.VendaResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Venda;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.VendaProduto;
import com.br.notoriousGAME.apiNotoriousGAME.repository.JogoRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.VendaProdutoRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaProdutoRepository vendaProdutoRepository;

    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<VendaResponseDTO> listarTodasVendas() {
        List<Venda> vendas = vendaRepository.findAll();
        return vendas.stream()
                .map(venda ->{
                    List<VendaProdutoResponseDTO> produtosDTO = venda.getProdutos().stream()
                            .map(VendaProdutoResponseDTO::new)
                            .toList();
                    return new VendaResponseDTO(venda, produtosDTO);
                })
                .collect(Collectors.toList());
    }

    public VendaResponseDTO listarVendaPorId(Long id) {
        Venda venda = getVendaEntityById(id);

        List<VendaProdutoResponseDTO> produtosDTO = venda.getProdutos().stream()
                .map(VendaProdutoResponseDTO::new)
                .toList();
        return new VendaResponseDTO(venda, produtosDTO);
    }

    @Transactional
    public VendaResponseDTO criarVenda(VendaRequestDTO vendaRequestDTO) {
        // 1. Busca o Usuário (Quem está comprando?)
        Usuario usuario = usuarioRepository.findById(vendaRequestDTO.idUsuario())
                .orElseThrow(()-> new RuntimeException("Usuário não encontrado"));

        // 2. Cria o cabeçalho da Venda (Status Pendente, Data Hoje, Total 0)
        Venda venda = new Venda(usuario);
        venda = vendaRepository.save(venda);

        // 3. Processa os Itens (Jogos)
        BigDecimal valorTotalCalculado = BigDecimal.ZERO;
        List<VendaProduto> produtosSalvos = new ArrayList<>();

        for (var produtoRequest : vendaRequestDTO.produtos()) {
            Jogo jogo = jogoRepository.findById(produtoRequest.idJogo())
                    .orElseThrow(()-> new RuntimeException("Jogo com o ID: " + produtoRequest.idJogo() + " não foi encontrado"));

            // Cria o relacionamento (Item -> Venda + Jogo)
            VendaProduto novoProduto = new VendaProduto(venda, jogo, jogo.getPrecoJogo());

            // Salva o item na tabela VendaProduto
            vendaProdutoRepository.save(novoProduto);

            // Adiciona na lista temporária e soma o preço
            produtosSalvos.add(novoProduto);
            valorTotalCalculado = valorTotalCalculado.add(jogo.getPrecoJogo());
        }

        // 4. Atualiza o valor total da Venda e Salva de novo
        venda.setPrecoTotal(valorTotalCalculado);
        venda.setProdutos(produtosSalvos);
        vendaRepository.save(venda);

        // 5. Retorna o DTO completo
        List<VendaProdutoResponseDTO> produtosDTO = produtosSalvos.stream()
                .map(VendaProdutoResponseDTO::new)
                .toList();

        return new VendaResponseDTO(venda, produtosDTO);
    }

    @Transactional
    public VendaResponseDTO atualizarVenda(Long idVenda, VendaAtualizarDTO vendaAtualizarDTO) {

        // 1. Busca a venda existente
        Venda venda = getVendaEntityById(idVenda);

        // 2. Atualiza os campos simples
        // A. Trocando o Dono (Usuário)
        if (!venda.getUsuario().getIdUsuario().equals(vendaAtualizarDTO.idUsuario())){
            Usuario novoUsuario = usuarioRepository.findById(vendaAtualizarDTO.idUsuario())
                    .orElseThrow(()-> new RuntimeException("Novo usuário não encontrado"));
            venda.setUsuario(novoUsuario);
        }

        // B. Trocando Data e Status
        venda.setDataVenda(vendaAtualizarDTO.dataVenda());
        venda.setStatusVenda(vendaAtualizarDTO.statusVenda());

        // 3. Atualizando os Itens (A parte complexa)

        // Passo A: Limpar a lista atual (O JPA vai deletar esses itens do banco)
        venda.getProdutos().clear();

        // Passo B: Recriar a lista com os novos jogos
        BigDecimal novoTotal = BigDecimal.ZERO;

        for (var produtoDTO : vendaAtualizarDTO.produtos()) {
            Jogo jogo = jogoRepository.findById(produtoDTO.idJogo())
                    .orElseThrow(()-> new RuntimeException("Jogo com ID " + produtoDTO.idJogo() + " não encontrado"));

            // Cria o novo item ligado a ESSA venda
            VendaProduto novoProduto = new VendaProduto(venda, jogo, jogo.getPrecoJogo());

            // Adiciona na lista da venda (O JPA vai salvar esses novos itens)
            venda.getProdutos().add(novoProduto);

            // Soma o preço
            novoTotal = novoTotal.add(jogo.getPrecoJogo());
        }

        // 4. Atualiza o Total
        venda.setPrecoTotal(novoTotal);

        // 5. Salva tudo (O save aqui propaga para a lista de itens)
        vendaRepository.save(venda);

        // 6. Retorna o DTO atualizado
        List<VendaProdutoResponseDTO> produtosResponse = venda.getProdutos().stream()
                .map(VendaProdutoResponseDTO::new)
                .toList();

        return new VendaResponseDTO(venda, produtosResponse);
    }

    public String deletarVenda(Long idVenda) {
        Venda venda = getVendaEntityById(idVenda);
        vendaRepository.delete(venda);
        return "Venda ID " + idVenda + " deletada com sucesso!";
    }

    public Venda getVendaEntityById(Long idVenda){
        return vendaRepository.findById(idVenda)
                .orElseThrow(()-> new RuntimeException("Não foi possivel achar uma venda com o ID: " + idVenda));
    }
}
