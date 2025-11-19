package com.br.notoriousGAME.apiNotoriousGAME.repository;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Jogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Long> {
}
