package com.br.notoriousGAME.apiNotoriousGAME.controller;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.LoginRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.UsuarioAtualizarDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.UsuarioRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.UsuarioResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodosUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.listarTodosUsuarios());
    }

    @GetMapping(value = "/{idUsuario}")
    public ResponseEntity<UsuarioResponseDTO> listarUsuarioPorId(@PathVariable Long idUsuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.listarUsuarioPorId(idUsuario));
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criarUsuario(@RequestBody @Valid UsuarioRequestDTO usuarioRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.criarUsuario(usuarioRequestDTO));
    }

    @PutMapping(value = "/{idUsuario}")
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(@PathVariable Long idUsuario, @RequestBody @Valid UsuarioAtualizarDTO dadosUsuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.atualizarUsuario(idUsuario, dadosUsuario));
    }

    @DeleteMapping(value = "/{idUsuario}")
    public ResponseEntity<String> deletarUsuario(@PathVariable Long idUsuario){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.deletarUsuario(idUsuario));
    }
}
