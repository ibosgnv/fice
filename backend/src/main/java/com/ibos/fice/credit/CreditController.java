package com.ibos.fice.credit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membres/{membreId}/credits")
@RequiredArgsConstructor
public class CreditController {

    private final CreditRepository creditRepository;

    @GetMapping
    public List<Credit> getCreditsByMembre(@PathVariable Long membreId) {
        return creditRepository.findByMembreId(membreId);
    }
}
