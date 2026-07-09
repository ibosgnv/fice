package com.ibos.fice.compte;

import com.ibos.fice.transaction.Transaction;
import com.ibos.fice.transaction.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/comptes/{compteId}/releve")
@RequiredArgsConstructor
public class ReleveController {

    private final CompteRepository compteRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> getReleve(@PathVariable Long compteId) {
        Compte compte = compteRepository.findById(compteId)
                .orElseThrow(() -> new RuntimeException("Compte introuvable"));

        List<Transaction> transactions = transactionRepository
                .findByCompteIdOrderByDateOperationDesc(compteId, PageRequest.of(0, 50));

        StringBuilder html = new StringBuilder();
        html.append("""
            <!DOCTYPE html>
            <html lang="fr">
            <head>
              <meta charset="UTF-8">
              <title>Relevé de compte — FICE</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #212121; }
                h1 { color: #1b5e20; border-bottom: 2px solid #1b5e20; padding-bottom: 8px; }
                .header { display: flex; justify-content: space-between; margin-bottom: 32px; }
                .info-bloc { margin-bottom: 16px; }
                .info-bloc p { margin: 4px 0; font-size: 14px; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
                th { background: #1b5e20; color: white; padding: 8px 12px; text-align: left; }
                td { padding: 8px 12px; border-bottom: 1px solid #e0e0e0; }
                tr:nth-child(even) { background: #f5f5f5; }
                .montant-positif { color: #2e7d32; font-weight: bold; }
                .montant-negatif { color: #c62828; font-weight: bold; }
                .solde-final { text-align: right; margin-top: 16px; font-size: 16px; font-weight: bold; color: #1b5e20; }
                .footer { margin-top: 32px; font-size: 11px; color: #757575; border-top: 1px solid #e0e0e0; padding-top: 8px; }
                @media print { button { display: none; } }
              </style>
            </head>
            <body>
            """);

        html.append("<h1>FICE — Relevé de compte</h1>");
        html.append("<div class='header'>");
        html.append("<div class='info-bloc'>");
        html.append("<p><strong>Numéro de compte :</strong> ").append(compte.getNumeroCompte()).append("</p>");
        html.append("<p><strong>Type :</strong> ").append(compte.getType()).append("</p>");
        html.append("<p><strong>Devise :</strong> ").append(compte.getDevise()).append("</p>");
        html.append("<p><strong>Statut :</strong> ").append(compte.getStatut()).append("</p>");
        html.append("</div>");
        html.append("<div class='info-bloc'>");
        html.append("<p><strong>Date d'édition :</strong> ").append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))).append("</p>");
        html.append("<p><strong>Solde actuel :</strong> ").append(String.format("%,.0f FC", compte.getSolde().doubleValue())).append("</p>");
        html.append("</div>");
        html.append("</div>");

        html.append("<table><thead><tr><th>Date</th><th>Libellé</th><th>Référence</th><th>Montant</th><th>Solde après</th></tr></thead><tbody>");

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        for (Transaction tx : transactions) {
            boolean isCredit = tx.getType() == Transaction.TypeTransaction.DEPOT
                    || tx.getType() == Transaction.TypeTransaction.VIREMENT_ENTRANT
                    || tx.getType() == Transaction.TypeTransaction.INTERET;

            html.append("<tr>")
                    .append("<td>").append(tx.getDateOperation().format(fmt)).append("</td>")
                    .append("<td>").append(tx.getLibelle()).append("</td>")
                    .append("<td>").append(tx.getReference()).append("</td>")
                    .append("<td class='").append(isCredit ? "montant-positif" : "montant-negatif").append("'>")
                    .append(isCredit ? "+" : "-")
                    .append(String.format("%,.0f FC", tx.getMontant().doubleValue()))
                    .append("</td>")
                    .append("<td>").append(String.format("%,.0f FC", tx.getSoldeApres().doubleValue())).append("</td>")
                    .append("</tr>");
        }

        html.append("</tbody></table>");
        html.append("<div class='solde-final'>Solde actuel : ")
                .append(String.format("%,.0f FC", compte.getSolde().doubleValue()))
                .append("</div>");
        html.append("<div class='footer'>FICE — Fédération des Institutions Coopératives d'Épargne · Document généré le ")
                .append(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                .append("</div>");
        html.append("<script>window.print();</script>");
        html.append("</body></html>");

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(html.toString());
    }
}
