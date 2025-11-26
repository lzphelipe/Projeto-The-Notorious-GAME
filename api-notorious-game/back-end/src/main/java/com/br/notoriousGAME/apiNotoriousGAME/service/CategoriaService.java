package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.CategoriaRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.CategoriaResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Categoria;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.CategoriaAlreadyExistsException;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.CategoriaNotFoundException;
import com.br.notoriousGAME.apiNotoriousGAME.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaResponseDTO> listarTodasCategorias() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return categorias.stream().map(CategoriaResponseDTO::new).collect(Collectors.toList());
    }

    public CategoriaResponseDTO listarCategoriaPorId(Long idCategoria) {
        Categoria categoria = getCategoriaEntityById(idCategoria);
        return new CategoriaResponseDTO(categoria);
    }

    public CategoriaResponseDTO criarCategoria(CategoriaRequestDTO categoriaRequestDTO) {
        if (categoriaRepository.findByNomeCategoriaIgnoreCase(categoriaRequestDTO.nomeCategoria()).isPresent()) {
            throw new CategoriaAlreadyExistsException("Erro: A categoria '" + categoriaRequestDTO.nomeCategoria() + "' já existe!");
        }
        Categoria categoria = new Categoria(categoriaRequestDTO);
        categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(categoria);
    }

    public CategoriaResponseDTO atualizarCategoria(Long idCategoria, CategoriaRequestDTO categoriaRequestDTO) {
        Categoria categoria = getCategoriaEntityById(idCategoria);
        categoria.setNomeCategoria(categoriaRequestDTO.nomeCategoria());
        categoria.setDescricao(categoriaRequestDTO.descricao());
        categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(categoria);
    }

    public String deletarCategoria(Long idCategoria) {
        Categoria categoria = getCategoriaEntityById(idCategoria);
        categoriaRepository.delete(categoria);
        return "Categoria deletada com sucesso!";
    }

    private Categoria getCategoriaEntityById(Long idCategoria) {
        return categoriaRepository.findById(idCategoria)
                .orElseThrow(()-> new CategoriaNotFoundException(idCategoria));
    }
}
