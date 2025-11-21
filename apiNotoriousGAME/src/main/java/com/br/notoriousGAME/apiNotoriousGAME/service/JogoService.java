package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.JogoRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.JogoResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Categoria;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;
import com.br.notoriousGAME.apiNotoriousGAME.repository.CategoriaRepository;
import com.br.notoriousGAME.apiNotoriousGAME.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<JogoResponseDTO> listarTodosJogos() {
        List<Jogo> jogos = jogoRepository.findAll();
        return jogos.stream().map(JogoResponseDTO::new).collect(Collectors.toList());
    }

    public JogoResponseDTO listarJogoPorId(Long idJogo) {
        Jogo jogo = getJogoEntityById(idJogo);
        return new JogoResponseDTO(jogo);
    }

    public JogoResponseDTO criarJogo(JogoRequestDTO jogoRequestDTO) {
        Categoria categoria = categoriaRepository.findById(jogoRequestDTO.idCategoria()).orElseThrow(()-> new RuntimeException("Não foi possivel encontrar nenhuma categoria com o ID: " + jogoRequestDTO.idCategoria()));
        Jogo jogo = new Jogo(jogoRequestDTO);
        jogo.setCategoria(categoria);
        jogoRepository.save(jogo);
        return new JogoResponseDTO(jogo);
    }

    public JogoResponseDTO atualizarJogo(Long idJogo, JogoRequestDTO jogoRequestDTO) {
        Jogo jogo = getJogoEntityById(idJogo);
        jogo.setNomeJogo(jogoRequestDTO.nomeJogo());
        jogo.setDesenvolvedoraJogo(jogoRequestDTO.desenvolvedoraJogo());
        jogo.setPrecoJogo(jogoRequestDTO.precoJogo());

        Categoria novaCategoria = categoriaRepository.findById(jogoRequestDTO.idCategoria()).orElseThrow(()-> new RuntimeException("Não foi possivel encontrar nenhuma categoria com o ID: " + jogoRequestDTO.idCategoria()));
        jogo.setCategoria(novaCategoria);
        jogoRepository.save(jogo);
        return new JogoResponseDTO(jogo);
    }

    public String deletarJogo(Long idJogo) {
        Jogo jogo = getJogoEntityById(idJogo);
        jogoRepository.delete(jogo);
        return "Jogo deletado com sucesso!";
    }

    private Jogo getJogoEntityById(Long idJogo) {
        return jogoRepository.findById(idJogo).orElseThrow(()-> new RuntimeException("Não foi possivel achar um jogo com o ID: " + idJogo));
    }
}
