package com.br.notoriousGAME.apiNotoriousGAME.controller;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.JogoRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.JogoResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.service.JogoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jogos")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<JogoResponseDTO>> listarTodosJogos(){
        return ResponseEntity.status(HttpStatus.OK).body(jogoService.listarTodosJogos());
    }

    @GetMapping(value = "/{idJogo}")
    public ResponseEntity<JogoResponseDTO> listarJogoPorId(@PathVariable Long idJogo){
        return ResponseEntity.status(HttpStatus.OK).body(jogoService.listarJogoPorId(idJogo));
    }

    @PutMapping(value = "/update/{idJogo}")
    public ResponseEntity<JogoResponseDTO> atualizarJogo(@PathVariable Long idJogo, @RequestBody @Valid JogoRequestDTO jogoRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(jogoService.atualizarJogo(idJogo, jogoRequestDTO));
    }

    @DeleteMapping(value = "/delete/{idJogo}")
    public ResponseEntity<String> deletarJogo(@PathVariable Long idJogo){
        return ResponseEntity.status(HttpStatus.OK).body(jogoService.deletarJogo(idJogo));
    }

    @PostMapping(value = "/create")
    public ResponseEntity<JogoResponseDTO> criarJogo(@RequestBody @Valid JogoRequestDTO jogoRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(jogoService.criarJogo(jogoRequestDTO));
    }
}