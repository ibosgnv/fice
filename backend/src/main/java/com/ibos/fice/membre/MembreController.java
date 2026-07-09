package com.ibos.fice.membre;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MembreController {

    private final MembreRepository membreRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/membres/{id}")
    public Membre getMembre(@PathVariable Long id) {
        return membreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membre non trouvé"));
    }

    @PatchMapping("/membres/{id}")
    public Membre updateMembre(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        Membre m = membreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membre non trouvé"));
        if (updates.containsKey("telephone")) m.setTelephone(updates.get("telephone"));
        if (updates.containsKey("adresse"))   m.setAdresse(updates.get("adresse"));
        if (updates.containsKey("ville"))     m.setVille(updates.get("ville"));
        return membreRepository.save(m);
    }

    @PatchMapping("/membres/{id}/password")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Membre m = membreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membre non trouvé"));
        if (!passwordEncoder.matches(body.get("motDePasseActuel"), m.getMotDePasse())) {
            return ResponseEntity.badRequest().body("Mot de passe actuel incorrect");
        }
        m.setMotDePasse(passwordEncoder.encode(body.get("nouveauMotDePasse")));
        membreRepository.save(m);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/membres")
    public List<Membre> getAllMembres() {
        return membreRepository.findAll();
    }
}
