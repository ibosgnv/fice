package com.ibos.fice.compte;

import com.ibos.fice.transaction.Transaction;
import com.ibos.fice.transaction.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CompteController {

    private final CompteRepository compteRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping("/membres/{membreId}/comptes")
    public List<Compte> getComptesByMembre(@PathVariable Long membreId) {
        return compteRepository.findByMembreId(membreId);
    }

    @GetMapping("/comptes/{compteId}/transactions")
    public List<Transaction> getTransactions(@PathVariable Long compteId,
                                              @RequestParam(defaultValue = "20") int limit) {
        return transactionRepository.findByCompteIdOrderByDateOperationDesc(
                compteId, PageRequest.of(0, limit));
    }

    @GetMapping("/membres/{membreId}/transactions")
    public List<Transaction> getTransactionsByMembre(@PathVariable Long membreId,
                                                      @RequestParam(defaultValue = "20") int limit) {
        return transactionRepository.findByCompteMembreIdOrderByDateOperationDesc(
                membreId, PageRequest.of(0, limit));
    }
}
