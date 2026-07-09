package com.ibos.fice.auth;

import com.ibos.fice.auth.dto.LoginRequest;
import com.ibos.fice.auth.dto.LoginResponse;
import com.ibos.fice.membre.Membre;
import com.ibos.fice.membre.MembreRepository;
import com.ibos.fice.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MembreRepository membreRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Hardcoded agent credentials for POC
    private static final String AGENT_EMAIL = "agent@fice.coop";
    private static final String AGENT_PASSWORD = "agent123";

    public LoginResponse login(LoginRequest request) {
        if (AGENT_EMAIL.equals(request.getEmail()) && AGENT_PASSWORD.equals(request.getMotDePasse())) {
            String token = jwtUtil.generateToken(AGENT_EMAIL, "AGENT");
            return new LoginResponse(token, "AGENT", "Kouassi", "Jean-Pierre", "AGT-001", 0L);
        }

        Membre membre = membreRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Identifiants incorrects"));

        if (!passwordEncoder.matches(request.getMotDePasse(), membre.getMotDePasse())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Identifiants incorrects");
        }

        if (membre.getStatut() == Membre.StatutMembre.SUSPENDU) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Compte suspendu. Contactez votre agence.");
        }

        String token = jwtUtil.generateToken(membre.getEmail(), "MEMBRE");
        return new LoginResponse(token, "MEMBRE", membre.getNom(), membre.getPrenom(),
                membre.getNumeroDeMembre(), membre.getId());
    }
}
