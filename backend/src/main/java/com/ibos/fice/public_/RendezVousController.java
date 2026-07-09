package com.ibos.fice.public_;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/rendez-vous")
public class RendezVousController {

    @PostMapping
    public Map<String, String> prendreRendezVous(@RequestBody Map<String, Object> body) {
        String ref = "RDV-2026-" + (1000 + (int)(Math.random() * 9000));
        return Map.of("reference", ref, "statut", "CONFIRME");
    }
}
