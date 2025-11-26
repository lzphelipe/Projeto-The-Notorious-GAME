package com.br.notoriousGAME.apiNotoriousGAME.controller;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaAtualizarDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.VendaRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.VendaResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public ResponseEntity<List<VendaResponseDTO>> listarTodasVendas() {
        return ResponseEntity.status(HttpStatus.OK).body(vendaService.listarTodasVendas());
    }

    @GetMapping(value = "/{idVenda}")
    public ResponseEntity<VendaResponseDTO> listarVendaPorId(@PathVariable Long idVenda) {
        return ResponseEntity.status(HttpStatus.OK).body(vendaService.listarVendaPorId(idVenda));
    }

    @PostMapping
    public ResponseEntity<VendaResponseDTO> criarVenda(@RequestBody @Valid VendaRequestDTO vendaRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(vendaService.criarVenda(vendaRequestDTO));
    }

    @PutMapping(value = "/{idVenda}")
    public ResponseEntity<VendaResponseDTO> atualizarVenda(@PathVariable Long idVenda, @RequestBody @Valid VendaAtualizarDTO dadosVenda) {
        return ResponseEntity.status(HttpStatus.OK).body(vendaService.atualizarVenda(idVenda, dadosVenda));
    }

    @DeleteMapping(value = "/{idVenda}")
    public ResponseEntity<String> deletarVenda(@PathVariable Long idVenda) {
        return ResponseEntity.status(HttpStatus.OK).body(vendaService.deletarVenda(idVenda));
    }
}
