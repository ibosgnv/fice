package com.ibos.fice.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCompteIdOrderByDateOperationDesc(Long compteId, Pageable pageable);
    List<Transaction> findByCompteMembreIdOrderByDateOperationDesc(Long membreId, Pageable pageable);
}
