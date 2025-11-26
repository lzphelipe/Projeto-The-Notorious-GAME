package com.br.notoriousGAME.apiNotoriousGAME.repository;

import com.br.notoriousGAME.apiNotoriousGAME.data.entity.VendaProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaProdutoRepository extends JpaRepository<VendaProduto,Long> {
}
