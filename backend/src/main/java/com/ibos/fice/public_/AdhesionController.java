package com.ibos.fice.public_;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/adhesions")
public class AdhesionController {

    @PostMapping
    public Map<String, String> creerAdhesion(@RequestBody Map<String, Object> body) {
        String ref = "ADH-2026-" + (1000 + (int)(Math.random() * 9000));
        return Map.of("numeroDossier", ref, "statut", "EN_ATTENTE");
    }
}
