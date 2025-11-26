package com.br.notoriousGAME.apiNotoriousGAME.controller;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.CategoriaRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.CategoriaResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<CategoriaResponseDTO>> listarTodasCategorias() {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.listarTodasCategorias());
    }

    @GetMapping(value = "/{idCategoria}")
    public ResponseEntity<CategoriaResponseDTO> listarCategoriaPorId(@PathVariable Long idCategoria) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.listarCategoriaPorId(idCategoria));
    }

    @PostMapping
    public ResponseEntity<CategoriaResponseDTO> criarCategoria(@RequestBody @Valid CategoriaRequestDTO categoriaRequestDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.criarCategoria(categoriaRequestDTO));
    }

    @PutMapping(value = "/{idCategoria}")
    public ResponseEntity<CategoriaResponseDTO> atualizarCategoria(@PathVariable Long idCategoria, @RequestBody @Valid CategoriaRequestDTO categoriaRequestDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.atualizarCategoria(idCategoria, categoriaRequestDTO));
    }

    @DeleteMapping(value = "/{idCategoria}")
    public ResponseEntity<String> deletarCategoria(@PathVariable Long idCategoria) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.deletarCategoria(idCategoria));
    }
}
