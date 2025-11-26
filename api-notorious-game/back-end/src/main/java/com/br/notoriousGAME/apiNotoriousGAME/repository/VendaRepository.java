package com.br.notoriousGAME.apiNotoriousGAME.repository;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
