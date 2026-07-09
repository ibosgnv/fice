package com.ibos.fice.public_;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/oppositions")
public class OppositionController {

    @PostMapping
    public Map<String, String> creerOpposition(@RequestBody Map<String, Object> body) {
        String ref = String.valueOf(1000 + (int)(Math.random() * 9000));
        return Map.of("numeroDossier", ref, "statut", "EN_COURS_TRAITEMENT");
    }
}
