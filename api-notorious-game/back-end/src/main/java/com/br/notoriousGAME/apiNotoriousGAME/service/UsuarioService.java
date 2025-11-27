package com.br.notoriousGAME.apiNotoriousGAME.service;

import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.UsuarioAtualizarDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.request.UsuarioRequestDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.dto.response.UsuarioResponseDTO;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Perfil;
import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Usuario;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.CPFAlreadyExistsException;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.EmailAlreadyExistsException;
import com.br.notoriousGAME.apiNotoriousGAME.exceptions.General.UsuarioNotFoundException;
import com.br.notoriousGAME.apiNotoriousGAME.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<UsuarioResponseDTO> listarTodosUsuarios(){
        return usuarioRepository.findAll().stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    public UsuarioResponseDTO listarUsuarioPorId(Long id){
        Usuario usuario = getUsuarioEntityById(id);
        return new UsuarioResponseDTO(usuario);
    }

    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO dadosUsuario){
        // Verificar se email ou CPF já existem
        if (usuarioRepository.findByEmail(dadosUsuario.email()).isPresent()){
            throw new EmailAlreadyExistsException("Este e-mail já está cadastrado!");
        }
        if (usuarioRepository.findByCpf(dadosUsuario.cpf()).isPresent()){
            throw new CPFAlreadyExistsException("Este CPF já está cadastrado!");
        }

        // Monta o Usuário
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNomeUsuario(dadosUsuario.nomeUsuario());
        novoUsuario.setEmail(dadosUsuario.email());
        novoUsuario.setCpf(dadosUsuario.cpf());
        novoUsuario.setSenha(dadosUsuario.senha());

        // Todo cadastro público nasce como CLIENTE
        novoUsuario.setPerfil(Perfil.PESSOA);

        // Salva e Retorna DTO (sem senha)
        usuarioRepository.save(novoUsuario);
        return new UsuarioResponseDTO(novoUsuario);
    }

    public UsuarioResponseDTO atualizarUsuario(Long id, UsuarioAtualizarDTO dadosUsuario){
        Usuario usuario = getUsuarioEntityById(id);

        // 1. Atualiza dados básicos
        if (dadosUsuario.nomeUsuario() != null && !dadosUsuario.nomeUsuario().isBlank()){
            usuario.setNomeUsuario(dadosUsuario.nomeUsuario());
        }

        // Verifica o E-mail
        if (dadosUsuario.email() != null && !dadosUsuario.email().equals(usuario.getEmail())){
            if (usuarioRepository.findByEmail(dadosUsuario.email()).isPresent()){
                throw new EmailAlreadyExistsException("Este e-mail já está sendo usado por outro usuário!");
            }
            usuario.setEmail(dadosUsuario.email());
        }

        // 2. Atualiza CPF (Admin pode corrigir erro de digitação)
        if (dadosUsuario.cpf() != null && !dadosUsuario.cpf().equals(usuario.getCpf())){
            if (usuarioRepository.findByCpf(dadosUsuario.cpf()).isPresent()){
                throw new CPFAlreadyExistsException("Este CPF já está sendo usado por outro usuário!");
            }
            usuario.setCpf(dadosUsuario.cpf());
        }

        // 3. Reseta a senha (se o Admin mandou uma nova)
        if (dadosUsuario.senha() != null && !dadosUsuario.senha().isEmpty()){
            usuario.setSenha(dadosUsuario.senha());
        }

        usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(usuario);
    }

    public String deletarUsuario(Long id){
        Usuario usuario = getUsuarioEntityById(id);
        usuarioRepository.delete(usuario);
        return "Usuário deletado com sucesso!";
    }

    public Usuario getUsuarioEntityById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(()-> new UsuarioNotFoundException(id));
    }
}
